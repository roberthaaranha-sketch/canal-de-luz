#!/usr/bin/env python3
"""
Indexador do Acervo Robertha Aranha
Lê todos os arquivos .txt, .doc, .docx do ACERVO ROBERTHA
e gera acervo.json para o site de busca.
"""

import os, re, json, zipfile, sys
from pathlib import Path

ACERVO = "/Users/roberthaaranha/Documents/ACERVO ROBERTHA"
OUTPUT = "/Users/roberthaaranha/plataforma-robertha-aranha/acervo.json"
SKIP_FOLDERS = {"Outras Pessoas", "Mensagens para Outros"}

# Nomes de outras pessoas que, quando aparecem como sujeito principal do título,
# indicam que a imersão NÃO é de/sobre Robertha Aranha
OTHER_NAMES = [
    'estefania','stefania','fausto','amanda','lucia','lucía','ana beatriz',
    'ana collete','ana collette','adriana','patricia','patrícia','juamp',
    'bianca','benjamim','benjamin','eduardo haidar','magali','gabriela belardi',
    'gabi belardi','marina ribeiro','camila paixao','camila paixão','rafael caran',
    'tatiana bergamo','tatiana','ariana azevedo','ariana','saulo','laroche',
    'ana suzuki','marlene','mafer','leidiene','fulvio','chrys hellen',
    'lucy holanda','anna colacioppo','clarisa','clarissa','yamile','laura conde',
    'sophia','isabella','yara racy',
]

# Padrão: "Imersão Robertha ... - [nome outro] [sufixo]" = sessão para outra pessoa
SUFFIX_PATTERN = re.compile(
    r'[-–]\s*(personal|mensagem|liberação|liberacao|terapia|personal)?\s*'
    r'(' + '|'.join(re.escape(n) for n in OTHER_NAMES) + r')',
    re.IGNORECASE
)

# Padrões para excluir
SKIP_FILE_PATTERNS = [
    r'por roberta schurmann',
    r'terapia.*5 perguntas.*por roberta',
]
SKIP_PATTERNS_COMPILED = [re.compile(p, re.IGNORECASE) for p in SKIP_FILE_PATTERNS]

def is_other_person_file(filename):
    """Retorna True se o arquivo é claramente sobre outra pessoa (não Robertha)."""
    fn = filename.lower()
    # 1. Qualquer nome de outra pessoa após um traço (- ou –)
    after_dash = re.search(r'[-–]\s*(.+)$', fn)
    if after_dash:
        suffix = after_dash.group(1)
        for name in OTHER_NAMES:
            if name in suffix:
                return True
    # 2. "para [nome]" ou "de [nome]"
    for name in OTHER_NAMES:
        if re.search(rf'(para|mensagem para|de)\s+{re.escape(name)}', fn):
            return True
        # Nome no início (é o sujeito)
        if fn.startswith(name):
            return True
        # Início: "imersão/terapia [quantica] [de] nome"
        if re.search(rf'^(imers|terap|canaliz|personal)\S*\s+(\w+\s+){{0,2}}{re.escape(name)}', fn):
            return True
    # 3. Sem nome de Robertha E tem nome de outra pessoa
    if not re.search(r'rob[e]?r?th?[ao]|aranha', fn):
        for name in OTHER_NAMES:
            if name in fn:
                return True
    return False

MONTHS = {
    'janeiro':1,'fevereiro':2,'março':3,'marco':3,'abril':4,'maio':5,'junho':6,
    'julho':7,'agosto':8,'setembro':9,'outubro':10,'novembro':11,'dezembro':12,
    'enero':1,'febrero':2,'marzo':3,'abril':4,'mayo':5,'junio':6,
    'julio':7,'agosto':8,'septiembre':9,'octubre':10,'noviembre':11,'diciembre':12,
}

def parse_date(name):
    n = name.lower()
    m = re.search(r'(\d{1,2})[_\s]+de[_\s]+(\w+)[_\s]+de[_\s]+(\d{4})', n)
    if m:
        d, mo, y = m.group(1), m.group(2), m.group(3)
        if mo in MONTHS:
            return f"{d.zfill(2)}/{MONTHS[mo]:02d}/{y}"
    m = re.search(r'(\d{1,2})[/_](\d{1,2})[/_](\d{4})', n)
    if m:
        return f"{m.group(1).zfill(2)}/{m.group(2).zfill(2)}/{m.group(3)}"
    m = re.search(r'(\d{4})', name)
    if m:
        return m.group(1)
    return ""

def read_txt(path):
    for enc in ['utf-8','latin-1','cp1252']:
        try:
            return open(path, encoding=enc, errors='ignore').read()
        except:
            pass
    return ""

def read_docx(path):
    try:
        with zipfile.ZipFile(path) as z:
            with z.open('word/document.xml') as f:
                xml = f.read().decode('utf-8', errors='ignore')
        text = re.sub(r'<[^>]+>', ' ', xml)
        return re.sub(r'\s+', ' ', text).strip()
    except:
        return ""

def read_doc(path):
    """Usa textutil (macOS) para extrair texto limpo de arquivos .doc/.dot antigos."""
    import subprocess
    try:
        result = subprocess.run(
            ['textutil', '-convert', 'txt', '-stdout', path],
            capture_output=True, text=True, timeout=10
        )
        text = result.stdout.strip()
        if text:
            return re.sub(r'\s+', ' ', text).strip()[:6000]
    except Exception:
        pass
    # Fallback: extração binária mínima
    try:
        raw = open(path, 'rb').read().decode('latin-1', errors='ignore')
        words = re.findall(r'[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ]{2,}(?:\s[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ]{2,}){2,}', raw)
        return re.sub(r'\s+', ' ', ' '.join(words)).strip()[:6000]
    except:
        return ""

def infer_type(title, content):
    t = (title + ' ' + content[:200]).lower()
    if 'imersão' in t or 'imersao' in t:
        return 'Imersão Quântica'
    if 'canaliz' in t:
        return 'Canalização'
    if 'registros' in t or 'akash' in t:
        return 'Registros Akáshicos'
    if '5 perguntas' in t or 'cinco perguntas' in t:
        return 'Terapia das 5 Perguntas'
    if 'consci' in t and 'multidim' in t:
        return 'Consciência Multidimensional'
    if 'mapa astral' in t or 'astrologia' in t:
        return 'Astrologia do Ser'
    if 'mensagem' in t:
        return 'Mensagem'
    return 'Canalização'

def extract_tags(text):
    t = text.lower()
    tags = []
    kw = {
        'amor':['amor','amar','amado','amada'],
        'luz':['luz','brilho','iluminação','iluminar'],
        'consciência':['consciência','consciencia','consciente'],
        'expansão':['expansão','expansao','expandir','expandindo'],
        'cura':['cura','curar','saúde','saude','cicatrizar'],
        'liberação':['liberação','liberaçao','liberar','libertar'],
        'medo':['medo','temor','receio'],
        'propósito':['propósito','proposito','missão','missao'],
        'paz':['paz','tranquil','calma','serenidade'],
        'gratidão':['gratidão','gratidao','agradeço','agradecendo'],
        'despertar':['despertar','despertar','desperdiç','acordar'],
        'transformação':['transformação','transformaçao','transformar','mudar'],
        'essência':['essência','essencia','ser de luz'],
        'registros':['akash','registros'],
        'ashtar':['ashtar','comando'],
        'arcanjo':['arcanjo','miguel','gabriel','rafael','metatron'],
        'ancestral':['ancestral','ancestrais','gerações','geraçoes'],
        'abundância':['abundância','abundancia','prosperidade'],
        'relacionamentos':['relacionamento','parceiro','amor romântico'],
    }
    for tag, words in kw.items():
        if any(w in t for w in words):
            tags.append(tag)
    return tags[:6]

def clean_title(fname):
    t = fname
    for ext in ['.txt','.docx','.doc','.dot']:
        t = t.replace(ext,'').replace(ext.upper(),'')
    t = re.sub(r'_\d+$', '', t)  # remove trailing _1, _2
    return t.strip()

# ── MAIN ──
entries = []
errors = 0
total_read = 0

print("Lendo arquivos do Acervo Robertha Aranha...")
print(f"Pasta: {ACERVO}\n")

for root, dirs, files in os.walk(ACERVO):
    # Skip unwanted folders
    rel = os.path.relpath(root, ACERVO)
    skip = False
    for sf in SKIP_FOLDERS:
        if sf in rel:
            skip = True
            break
    if skip:
        dirs.clear()
        continue

    for fname in sorted(files):
        if fname.startswith('.') or fname.startswith('~'):
            continue

        ext = Path(fname).suffix.lower()
        if ext not in ('.txt', '.doc', '.docx', '.dot'):
            continue

        # Skip files clearly about other people
        if any(p.search(fname) for p in SKIP_PATTERNS_COMPILED):
            continue
        if is_other_person_file(fname):
            continue

        path = os.path.join(root, fname)
        parts = rel.split(os.sep)

        # Determine year/source
        if parts[0] == 'Evernote' and len(parts) > 1:
            year = parts[1]
            source = 'Evernote'
        elif parts[0].isdigit():
            year = parts[0]
            source = 'Acervo'
        elif parts[0] == 'sem_data':
            year = 'sem data'
            source = 'Acervo'
        else:
            year = parts[0]
            source = 'Acervo'

        # Read content
        try:
            if ext == '.txt':
                content = read_txt(path)
            elif ext == '.docx':
                content = read_docx(path)
            elif ext in ('.doc', '.dot'):
                content = read_doc(path)
            else:
                content = ""
        except Exception as e:
            errors += 1
            continue

        if not content.strip():
            continue

        title = clean_title(fname)
        date = parse_date(title)
        tipo = infer_type(title, content)
        tags = extract_tags(content)
        clean = re.sub(r'\s+', ' ', content).strip()
        excerpt = clean[:250]          # preview curto para a lista
        full    = clean[:6000]         # conteúdo completo para leitura

        entries.append({
            'id': len(entries),
            'titulo': title,
            'data': date,
            'ano': year,
            'fonte': source,
            'tipo': tipo,
            'tags': tags,
            'excerpt': excerpt,
            'full': full,
        })
        total_read += 1

        if total_read % 500 == 0:
            print(f"  {total_read} arquivos processados...")

print(f"\n✦ Total indexado: {total_read} imersões e canalizações")
print(f"  Erros: {errors}")
print(f"  Salvando em {OUTPUT}...")

with open(OUTPUT, 'w', encoding='utf-8') as f:
    json.dump(entries, f, ensure_ascii=False, separators=(',',':'))

size_mb = os.path.getsize(OUTPUT) / 1024 / 1024
print(f"  Arquivo gerado: {size_mb:.1f} MB")
print(f"\n✦ Acervo pronto para o site!")

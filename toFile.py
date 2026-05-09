import os

# sekcja konfiguracja i zmienne lokalne
folder_projektu = '.'

ignorowane_foldery = [
    '.venv',
    '__pycache__',
    '.git',
    '.idea',
    '.css',
    'tests',
    'node_modules',
    'assets',
    'dist',
    'build',
    'venv',
    'venv_gui',
    'venv_plugin',
    'venv_api',
    'venv_api_app',
    'venv_api_app_test',
    'venv_api_app_test_data',

]

dozwolone_rozszerzenia = ['.py', '.js', '.html']

# mapowanie folderów -> pliki wynikowe
foldery_docelowe = {
    'api/app': 'kod_api_app.txt',
    'gui': 'kod_gui.txt',
    'plugin': 'kod_plugin.txt'
}

# pliki do pominięcia
ignorowane_pliki = [
    'train.py'
]

# nazwa aktualnego skryptu
aktualny_plik = os.path.basename(__file__)


def zapisz_kod_z_folderu(folder_nazwa, plik_wynikowy):
    folder_sciezka = os.path.join(folder_projektu, folder_nazwa)

    # sprawdzenie czy folder istnieje
    if not os.path.exists(folder_sciezka):
        print(f"Folder nie istnieje: {folder_nazwa}")
        return

    with open(plik_wynikowy, 'w', encoding='utf-8') as plik_wy:

        for root, dirs, files in os.walk(folder_sciezka):

            # pomijanie ignorowanych folderów
            dirs[:] = [
                d for d in dirs
                if d not in ignorowane_foldery
            ]

            for file in files:

                # pomijanie wybranych plików
                if file in ignorowane_pliki:
                    continue

                # pomijanie aktualnego pliku skryptu
                if file == aktualny_plik:
                    continue

                # sprawdzanie rozszerzenia
                if any(file.endswith(ext) for ext in dozwolone_rozszerzenia):

                    sciezka_pelna = os.path.join(root, file)

                    sciezka_pliku = os.path.relpath(
                        sciezka_pelna,
                        folder_projektu
                    )

                    # sekcja zapisywanie zawartości
                    plik_wy.write(
                        f"=== LOKALIZACJA: {sciezka_pliku} ===\n\n"
                    )

                    try:
                        with open(
                            sciezka_pelna,
                            'r',
                            encoding='utf-8'
                        ) as f:
                            plik_wy.write(f.read())

                    except Exception as e:
                        plik_wy.write(
                            f"Błąd odczytu pliku: {e}\n"
                        )

                    plik_wy.write("\n\n")

    print(f"Sukces! Zapisano: {plik_wynikowy}")


# sekcja główna
for folder, plik in foldery_docelowe.items():
    zapisz_kod_z_folderu(folder, plik)
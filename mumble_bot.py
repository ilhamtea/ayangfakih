from pymumble_py3 import Mumble
import xml.etree.ElementTree as ET
import time

MUMBLE_SERVER = 'beve-studio.my.id'     # Ganti dengan alamat server Mumble
MUMBLE_USER = 'BotMusik'                   # Nama bot
MUMBLE_PASSWORD = 'password_mumble'        # Password server Mumble, jika ada

def read_xml():
    tree = ET.parse('se.xml')
    root = tree.getroot()
    result = []
    for item in root:
        # Misal item berisi nama radio/lagu di <name>
        result.append(item.find('name').text if item.find('name') is not None else item.tag)
    return result

# Inisialisasi koneksi Mumble
mumble = Mumble(MUMBLE_SERVER, MUMBLE_USER, password=MUMBLE_PASSWORD)
mumble.set_receive_sound(True)
mumble.start()
mumble.is_ready()

print("Bot Mumble siap!")
print("Daftar dari se.xml:")
print(read_xml())

while True:
    time.sleep(1)

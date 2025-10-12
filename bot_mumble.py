from pymumble_py3 import Mumble
import time

SERVER = "address.server-mumble.com"
PORT = 64738  # Port default Mumble
USERNAME = "MyBot"
PASSWORD = None  # Atur jika server pakai password

def on_text_message(text):
    print(f"Pesan dari {text.actor}: {text.message}")
    # Balas otomatis
    mumble.users[text.actor]['session'].send_text_message("Halo, aku bot!")

mumble = Mumble(SERVER, USERNAME, password=PASSWORD, port=PORT, debug=True)
mumble.callbacks.set_callback("text_message_received", on_text_message)
mumble.set_receive_sound(False)
mumble.start()
mumble.is_ready()

print("Bot sudah join server Mumble.")

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Bot dihentikan.")
    mumble.stop()

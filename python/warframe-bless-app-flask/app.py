from flask import Flask, render_template, request
import datetime

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    output = ""
    if request.method == 'POST':
        region = request.form.get('region')
        relay_name = request.form.get('relay_name')
        relay_instance = request.form.get('relay_instance')
        affinity_bless = request.form.get('affinity_bless')
        credit_bless = request.form.get('credit_bless')
        resource_bless = request.form.get('resource_bless')
        damage_bless = request.form.get('damage_bless')
        health_bless = request.form.get('health_bless')
        shield_bless = request.form.get('shield_bless')
        backup_bless = request.form.get('backup_bless')

        # Calculate time until bless
        delta = datetime.timedelta(hours=1)
        now = datetime.datetime.now()
        next_hour = (now + delta).replace(second=0, minute=0)
        wait_minutes = int((next_hour - now).seconds / 60)

        # Build the output string
        output_lines = []

        # Output !bless command
        bless_types = ['affinity', 'credit', 'resource', 'damage', 'health', 'shield']
        active_blesses = [b for b in [affinity_bless, credit_bless, resource_bless, damage_bless, health_bless, shield_bless, backup_bless] if b]
        
        bless_command = f"!bless {region} {relay_name} {relay_instance} {wait_minutes} min "
        bless_command += " ".join(bless_types[0:len(active_blesses)])
        output_lines.append(bless_command)
        output_lines.append("")


        # Output roles to paste into relay chat
        roles_message = "BLESSING ROLES: "
        if affinity_bless:
            roles_message += f"@{affinity_bless} -> {bless_types[0].capitalize()} | "
        if credit_bless:
            roles_message += f"@{credit_bless} -> {bless_types[1].capitalize()} | "
        if resource_bless:
            roles_message += f"@{resource_bless} -> {bless_types[2].capitalize()} | "
        if damage_bless:
            roles_message += f"@{damage_bless} -> {bless_types[3].capitalize()} | "
        if health_bless:
            roles_message += f"@{health_bless} -> {bless_types[4].capitalize()} | "
        if shield_bless:
            roles_message += f"@{shield_bless} -> {bless_types[5].capitalize()}  | "
        if backup_bless:
            roles_message += f"@{backup_bless} -> Backup  | "
        roles_message += f"Blessing in {wait_minutes} minutes"
        output_lines.append(roles_message)
        output_lines.append("")

        # Region mapping
        region_map = {"as": "Asia", "eu": "Europe", "na": "NorthAmerica"}
        region_full = region_map.get(region, "Unknown")

        # Nag whisper for missing blessers and list for thanks
        roll_call = [b for b in [affinity_bless, credit_bless, resource_bless, damage_bless, health_bless, shield_bless] if b]
        
        nag_message = f"Reminder for bless at {relay_name.capitalize()} {relay_instance} in {region_full} region. You\'ll be on"
        for i, blesser in enumerate(roll_call):
            output_lines.append(f"/w {blesser} {nag_message} {bless_types[i].capitalize()}")

        output_lines.append("")
        
        # Roll call and thank you message
        if roll_call:
            output_lines.append('Roll call. @' + ' @'.join(roll_call) + ' :clem:')
            output_lines.append("")
            output_lines.append('Thanks to ' + ', '.join(roll_call) + ' for blessing')

        output = "\n".join(output_lines)

    return render_template('index.html', output=output, request=request)

if __name__ == '__main__':
    app.run(debug=True)

export default {
  async fetch(request) {
    if (request.method === 'POST') {
      const formData = await request.formData();
      const region = formData.get('region');
      const relay_name = formData.get('relay_name');
      const relay_instance = formData.get('relay_instance');
      const affinity_bless = formData.get('affinity_bless');
      const credit_bless = formData.get('credit_bless');
      const resource_bless = formData.get('resource_bless');
      const damage_bless = formData.get('damage_bless');
      const health_bless = formData.get('health_bless');
      const shield_bless = formData.get('shield_bless');
      const backup_bless = formData.get('backup_bless');

      const now = new Date();
      const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
      const wait_minutes = Math.floor((nextHour - now) / 60000);

      let output_lines = [];
      const bless_types = ['affinity', 'credit', 'resource', 'damage', 'health', 'shield'];
      const active_blesses = [affinity_bless, credit_bless, resource_bless, damage_bless, health_bless, shield_bless, backup_bless].filter(Boolean);

      let bless_command = `!bless ${region} ${relay_name} ${relay_instance} ${wait_minutes} min `;
      bless_command += bless_types.slice(0, active_blesses.length).join(' ');
      output_lines.push(bless_command);

      let roles_message = "BLESSING ROLES: ";
      if (affinity_bless) roles_message += `@${affinity_bless} -> ${bless_types[0].charAt(0).toUpperCase() + bless_types[0].slice(1)} | `;
      if (credit_bless) roles_message += `@${credit_bless} -> ${bless_types[1].charAt(0).toUpperCase() + bless_types[1].slice(1)} | `;
      if (resource_bless) roles_message += `@${resource_bless} -> ${bless_types[2].charAt(0).toUpperCase() + bless_types[2].slice(1)} | `;
      if (damage_bless) roles_message += `@${damage_bless} -> ${bless_types[3].charAt(0).toUpperCase() + bless_types[3].slice(1)} | `;
      if (health_bless) roles_message += `@${health_bless} -> ${bless_types[4].charAt(0).toUpperCase() + bless_types[4].slice(1)} | `;
      if (shield_bless) roles_message += `@${shield_bless} -> ${bless_types[5].charAt(0).toUpperCase() + bless_types[5].slice(1)}  | `;
      if (backup_bless) roles_message += `@${backup_bless} -> Backup  | `;
      roles_message += `Blessing in ${wait_minutes} minutes`;
      output_lines.push(roles_message);

      const region_map = {"as": "Asia", "eu": "Europe", "na": "NorthAmerica"};
      const region_full = region_map[region] || "Unknown";

      const roll_call = [affinity_bless, credit_bless, resource_bless, damage_bless, health_bless, shield_bless].filter(Boolean);
      const nag_message = `Reminder for bless at ${relay_name.charAt(0).toUpperCase() + relay_name.slice(1)} ${relay_instance} in ${region_full} region. You'll be on`;
      roll_call.forEach((blesser, i) => {
        output_lines.push(`/w ${blesser} ${nag_message} ${bless_types[i].charAt(0).toUpperCase() + bless_types[i].slice(1)}`);
      });


      if (roll_call.length > 0) {
        output_lines.push('Roll call. @' + roll_call.join(' @') + ' :clem:');

        output_lines.push('Thanks to ' + roll_call.join(', ') + ' for blessing');
      }

      const output = output_lines.join('\n');
      
      const html = renderHTML(output, formData);
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });

    } else {
      const html = renderHTML("", null);
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }
  },
};

function renderHTML(output, formData) {
  const getFormValue = (field) => formData ? (formData.get(field) || '') : '';
  const isSelected = (field, value) => formData ? (formData.get(field) === value ? 'selected' : '') : '';

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Warframe Bless Helper</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
      <div class="container mt-5">
        <h1 class="display-4">Warframe Bless Helper</h1>
        <p class="lead">Generate blessing messages for Warframe relays.</p>
        
        <form method="POST" class="mt-4">
          <div class="card">
            <div class="card-header">
              Blessing Setup
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="region" class="form-label">Region</label>
                  <select class="form-select" id="region" name="region">
                    <option value="as" ${isSelected('region', 'as')}>Asia</option>
                    <option value="eu" ${isSelected('region', 'eu')}>Europe</option>
                    <option value="na" ${isSelected('region', 'na')}>North America</option>
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="relay_name" class="form-label">Relay Name</label>
                  <select class="form-select" id="relay_name" name="relay_name">
                    <option value="larunda" ${isSelected('relay_name', 'larunda')}>Larunda</option>
                    <option value="strata" ${isSelected('relay_name', 'strata')}>Strata</option>
                    <option value="kronia" ${isSelected('relay_name', 'kronia')}>Kronia</option>
                    <option value="maroo" ${isSelected('relay_name', 'maroo')}>Maroo</option>
                    <option value="orcus" ${isSelected('relay_name', 'orcus')}>Orcus</option>
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="relay_instance" class="form-label">Relay Instance</label>
                  <select class="form-select" id="relay_instance" name="relay_instance">
                    <option value="1" ${isSelected('relay_instance', '1')}>1</option>
                    <option value="2" ${isSelected('relay_instance', '2')}>2</option>
                    <option value="3" ${isSelected('relay_instance', '3')}>3</option>
                    <option value="69" ${isSelected('relay_instance', '69')}>69</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              Blessers
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="affinity_bless" class="form-label">Affinity</label>
                  <input type="text" class="form-control" id="affinity_bless" name="affinity_bless" placeholder="Username" value="${getFormValue('affinity_bless')}">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="credit_bless" class="form-label">Credit</label>
                  <input type="text" class="form-control" id="credit_bless" name="credit_bless" placeholder="Username" value="${getFormValue('credit_bless')}">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="resource_bless" class="form-label">Resource</label>
                  <input type="text" class="form-control" id="resource_bless" name="resource_bless" placeholder="Username" value="${getFormValue('resource_bless')}">
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="damage_bless" class="form-label">Damage</label>
                  <input type="text" class="form-control" id="damage_bless" name="damage_bless" placeholder="Username" value="${getFormValue('damage_bless')}">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="health_bless" class="form-label">Health</label>
                  <input type="text" class="form-control" id="health_bless" name="health_bless" placeholder="Username" value="${getFormValue('health_bless')}">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="shield_bless" class="form-label">Shield</label>
                  <input type="text" class="form-control" id="shield_bless" name="shield_bless" placeholder="Username" value="${getFormValue('shield_bless')}">
                </div>
              </div>
              <div class="row">
                  <div class="col-md-4 mb-3">
                      <label for="backup_bless" class="form-label">Backup</label>
                      <input type="text" class="form-control" id="backup_bless" name="backup_bless" placeholder="Username" value="${getFormValue('backup_bless')}">
                  </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-lg mt-4">Generate</button>
        </form>

        ${output ? `
        <div class="mt-5">
          <h2>Generated Output</h2>
          <div class="card">
            <div class="card-body">
              ${output.split('\n').map((line, index, array) => `
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <code id="output-line-${index}" class="flex-grow-1 me-2">${line}</code>
                  <button class="btn btn-sm btn-outline-secondary copy-btn" data-target="output-line-${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg>
                  </button>
                </div>
                ${index < array.length - 1 ? '<hr class="my-2">': ''}
              `).join('')}
            </div>
          </div>
        </div>
        ` : ''}

      </div>
      <footer class="footer mt-auto py-3 bg-light">
        <div class="container text-center">
          <span class="text-muted">Built with Gemini</span>
        </div>
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      <script>
        document.querySelectorAll('.copy-btn').forEach(button => {
          button.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.copy-btn');
            const targetId = clickedButton.dataset.target;
            const textToCopy = document.getElementById(targetId).innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
              const originalInnerHTML = clickedButton.innerHTML;
              clickedButton.innerText = 'Copied!';
              setTimeout(() => {
                clickedButton.innerHTML = originalInnerHTML;
              }, 1500);
            }).catch(err => {
              console.error('Failed to copy: ', err);
            });
          });
        });
      </script>
    </body>
  </html>
  `;
}

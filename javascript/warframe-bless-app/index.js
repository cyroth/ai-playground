const BLESS_TYPES = [
  { id: 'affinity', name: 'Affinity' },
  { id: 'credit', name: 'Credit' },
  { id: 'resource', name: 'Resource' },
  { id: 'damage', name: 'Damage' },
  { id: 'health', name: 'Health' },
  { id: 'shield', name: 'Shield' },
];

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

      const output_lines = []; // Will be an array of {label, content}
      const active_blesses = [affinity_bless, credit_bless, resource_bless, damage_bless, health_bless, shield_bless, backup_bless].filter(Boolean);

      // 1. !bless command
      let bless_command = `!bless ${region} ${relay_name} ${relay_instance} ${wait_minutes} min `;
      bless_command += BLESS_TYPES.map(b => b.id).slice(0, active_blesses.length).join(' ');
      output_lines.push({ label: 'Bot Command', content: bless_command });

      // 2. Roles message
      let roles_message = "BLESSING ROLES: ";
      if (affinity_bless) roles_message += `@${affinity_bless} -> ${BLESS_TYPES[0].name} | `;
      if (credit_bless) roles_message += `@${credit_bless} -> ${BLESS_TYPES[1].name} | `;
      if (resource_bless) roles_message += `@${resource_bless} -> ${BLESS_TYPES[2].name} | `;
      if (damage_bless) roles_message += `@${damage_bless} -> ${BLESS_TYPES[3].name} | `;
      if (health_bless) roles_message += `@${health_bless} -> ${BLESS_TYPES[4].name} | `;
      if (shield_bless) roles_message += `@${shield_bless} -> ${BLESS_TYPES[5].name}  | `;
      if (backup_bless) roles_message += `@${backup_bless} -> Backup  | `;
      roles_message += `Blessing in ${wait_minutes} minutes`;
      output_lines.push({ label: 'Squad Message', content: roles_message });

      // 3. Nag whispers
      const region_map = {"as": "Asia", "eu": "Europe", "na": "NorthAmerica"};
      const region_full = region_map[region] || "Unknown";
      const roll_call = [affinity_bless, credit_bless, resource_bless, damage_bless, health_bless, shield_bless].filter(Boolean);
      const nag_message = `Reminder for bless at ${relay_name.charAt(0).toUpperCase() + relay_name.slice(1)} ${relay_instance} in ${region_full} region. You'll be on`;
      const blesser_data = [affinity_bless, credit_bless, resource_bless, damage_bless, health_bless, shield_bless];
      blesser_data.forEach((blesser, i) => {
        if (blesser) {
          output_lines.push({ label: `Whisper ${blesser}`, content: `/w ${blesser} ${nag_message} ${BLESS_TYPES[i].name}` });
        }
      });

      // 4. Roll call and thanks
      if (roll_call.length > 0) {
        output_lines.push({ label: 'Roll Call', content: 'Roll call. @' + roll_call.join(' @') + ' :clem:' });
        output_lines.push({ label: 'Thank You', content: 'Thanks to ' + roll_call.join(', ') + ' for blessing' });
      }
      
      const html = renderHTML(output_lines, formData);
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });

    } else {
      const html = renderHTML("", null);
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }
  },
};

function renderHTML(output, formData) {
  const getFormValue = (field) => formData ? (formData.get(field) || '') : ''; // Keep this for form repopulation
  const isSelected = (field, value) => formData ? (formData.get(field) === value ? 'selected' : '') : '';

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="color-scheme" content="dark light">
      <title>Warframe Bless Helper</title>
      <script>
        // Critical theme application: run as early as possible to avoid flash of incorrect theme.
        (function(){
          try {
            var theme = localStorage.getItem('theme') || 'dark'; // Default to dark
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            }
          } catch(e) { /* ignore */ }
        })();
      </script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
  :root{
    --bg:#f8f9fa;
    --text:#212529;
    --card-bg:#fff;
    --input-bg:#ffffff;
    --border:rgba(0,0,0,0.125);
  }
  .dark{
    --bg:#0b1220;
    --text:#e6edf3;
    --card-bg:#0f1724;
    --input-bg:#0b1220;
    --border:rgba(255,255,255,0.12);
  }
  html,body{background:var(--bg);color:var(--text);} 
  .card, .card-body, .card-header{background:var(--card-bg);color:var(--text);border-color:var(--border)}
  /* make form inputs and selects follow the input background variable so dropdowns are dark in dark mode */
  .form-control, .form-select{background-color:var(--input-bg);color:var(--text);border-color:var(--border)}
  .form-select option{background-color:var(--input-bg);color:var(--text)}
  /* keep dark caret SVG but ensure it contrasts */
  .dark .form-select { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23e6edf3' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right .75rem center; }
  code{background:rgba(0,0,0,0.04);padding:.15rem .3rem;border-radius:.25rem}
  .dark .text-muted { color: rgba(230, 237, 243, 0.6) !important; }
  </style>
    </head>
    <body>
      <div class="container mt-5">
        <div class="d-flex align-items-start justify-content-between mb-3">
          <div>
            <h1 class="display-4 mb-0">Warframe Bless Helper</h1>
            <p class="lead mb-0">Generate blessing messages for Warframe relays.</p>
          </div>
          <div class="ms-3">
            <button id="theme-toggle" class="btn btn-outline-secondary" aria-pressed="false" aria-label="Toggle color theme" title="Toggle color theme">🌙 <span id="theme-toggle-label">Dark</span></button>
          </div>
        </div>
        
        <form method="POST" class="mt-4" autocomplete="off">
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
                  <input type="text" class="form-control" id="affinity_bless" name="affinity_bless" placeholder="Tenno" value="${getFormValue('affinity_bless')}" autocomplete="off">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="credit_bless" class="form-label">Credit</label>
                  <input type="text" class="form-control" id="credit_bless" name="credit_bless" placeholder="Tenno" value="${getFormValue('credit_bless')}" autocomplete="off">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="resource_bless" class="form-label">Resource</label>
                  <input type="text" class="form-control" id="resource_bless" name="resource_bless" placeholder="Tenno" value="${getFormValue('resource_bless')}" autocomplete="off">
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="damage_bless" class="form-label">Damage</label>
                  <input type="text" class="form-control" id="damage_bless" name="damage_bless" placeholder="Tenno" value="${getFormValue('damage_bless')}" autocomplete="off">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="health_bless" class="form-label">Health</label>
                  <input type="text" class="form-control" id="health_bless" name="health_bless" placeholder="Tenno" value="${getFormValue('health_bless')}" autocomplete="off">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="shield_bless" class="form-label">Shield</label>
                  <input type="text" class="form-control" id="shield_bless" name="shield_bless" placeholder="Tenno" value="${getFormValue('shield_bless')}" autocomplete="off">
                </div>
              </div>
              <div class="row">
                  <div class="col-md-4 mb-3">
                      <label for="backup_bless" class="form-label">Backup</label>
                      <input type="text" class="form-control" id="backup_bless" name="backup_bless" placeholder="Tenno" value="${getFormValue('backup_bless')}" autocomplete="off">
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
              ${output.map((line, index, array) => `
                <div class="mb-2">
                  <label for="output-line-${index}" class="form-label small text-muted">${line.label}</label>
                  <div class="d-flex justify-content-between align-items-center">
                    <code id="output-line-${index}" class="flex-grow-1 me-2">${line.content}</code>
                    <button class="btn btn-sm btn-outline-secondary copy-btn" data-target="output-line-${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg>
                  </button>
                </div>
                ${index < array.length - 1 ? '<hr class="my-1 border-secondary">': ''}
              `).join('')}
            </div>
          </div>
        </div>
        ` : ''}

      </div>
      <footer class="footer mt-auto py-3">
        <div class="container text-center">
          <span class="text-muted">Built with Gemini</span>
        </div>
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      <script>
        // Inline simple theme toggle + reset wiring
        (function(){
          function applyTheme(theme){
            if (theme === 'dark') document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
          }
          function refreshUI(){
            const isDark = document.documentElement.classList.contains('dark');
            var btnLabel = document.getElementById('theme-toggle-label'); 
            if(btnLabel) btnLabel.textContent = isDark ? 'Light' : 'Dark';
          }
          document.addEventListener('DOMContentLoaded', function(){
            // Set initial UI state based on class applied in <head>
            refreshUI();
            // Attach event listener to toggle and save theme
            var tbtn = document.getElementById('theme-toggle'); 
            if(tbtn) tbtn.addEventListener('click', function(){ 
              var isDark = document.documentElement.classList.toggle('dark'); 
              try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch(e) { /* ignore */ }
              refreshUI(); 
            });
          });
        })();
      </script>
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

document.getElementById('zone-zip').addEventListener('change', function() {
    const premiereInstallationGroup = document.getElementById('premiere-installation-group');
    if (this.value === 'oui') {
        premiereInstallationGroup.style.display = 'block';
    } else {
        premiereInstallationGroup.style.display = 'none';
    }
});

function calculerForfait() {
    // Récupération des valeurs du formulaire
    const nonAldC2SMoins7 = parseInt(document.getElementById('non-ald-c2s-moins-7').value, 10) || 0;
    const nonAldC2S7_74 = parseInt(document.getElementById('non-ald-c2s-7-74').value, 10) || 0;
    const nonAldC2S75_79 = parseInt(document.getElementById('non-ald-c2s-75-79').value, 10) || 0;
    const nonAldC2S80Plus = parseInt(document.getElementById('non-ald-c2s-80-plus').value, 10) || 0;

    const aldNonC2SMoins80 = parseInt(document.getElementById('ald-non-c2s-moins-80').value, 10) || 0;
    const aldNonC2S80Plus = parseInt(document.getElementById('ald-non-c2s-80-plus').value, 10) || 0;

    const nonAldC2SMoins7_C2S = parseInt(document.getElementById('non-ald-c2s-c2s-moins-7').value, 10) || 0;
    const nonAldC2S7_74_C2S = parseInt(document.getElementById('non-ald-c2s-c2s-7-74').value, 10) || 0;
    const nonAldC2S75_79_C2S = parseInt(document.getElementById('non-ald-c2s-c2s-75-79').value, 10) || 0;
    const nonAldC2S80Plus_C2S = parseInt(document.getElementById('non-ald-c2s-c2s-80-plus').value, 10) || 0;

    const aldC2SMoins80 = parseInt(document.getElementById('ald-c2s-moins-80').value, 10) || 0;
    const aldC2S80Plus = parseInt(document.getElementById('ald-c2s-80-plus').value, 10) || 0;

    const zoneZip = document.getElementById('zone-zip').value;
    const premiereInstallation = zoneZip === 'oui' ? document.getElementById('premiere-installation').value : 'non';

    const ageMedecin = parseInt(document.getElementById('age-medecin').value, 10) || 0;
    const patientsNonVus = parseInt(document.getElementById('patients-non-vus').value, 10) || 0;

    // Calcul du forfait initial
    let forfaitInitial = 0;

    // Calcul des montants pour les patients non ALD et non C2S
    forfaitInitial += nonAldC2SMoins7 * 15;
    forfaitInitial += nonAldC2S7_74 * 5;
    forfaitInitial += nonAldC2S75_79 * 15;
    forfaitInitial += nonAldC2S80Plus * 55;

    // Calcul des montants pour les patients en ALD et non C2S
    forfaitInitial += aldNonC2SMoins80 * 55;
    forfaitInitial += aldNonC2S80Plus * 100;

    // Calcul des montants pour les patients non ALD et C2S
    forfaitInitial += nonAldC2SMoins7_C2S * 25; // 15 + 10
    forfaitInitial += nonAldC2S7_74_C2S * 15; // 5 + 10
    forfaitInitial += nonAldC2S75_79_C2S * 25; // 15 + 10
    forfaitInitial += nonAldC2S80Plus_C2S * 65; // 55 + 10

    // Calcul des montants pour les patients en ALD et C2S
    forfaitInitial += aldC2SMoins80 * 65; // 55 + 10
    forfaitInitial += aldC2S80Plus * 110; // 100 + 10

    // Ajustement pour les patients non vus
    forfaitInitial += patientsNonVus * 5;

    // Initialiser le montant final avec le forfait initial
    let forfaitFinal = forfaitInitial;

    // Application de la majoration ZIP
    if (zoneZip === 'oui') {
        forfaitFinal += forfaitInitial * 0.1;
    }

    // Application de la majoration Première installation en ZIP
    if (zoneZip === 'oui' && premiereInstallation === 'oui') {
        forfaitFinal += forfaitInitial * 0.5;
    }

    // Application de la majoration Âge du médecin
    if (ageMedecin >= 67) {
        forfaitFinal += forfaitInitial * 0.1;
    }

    document.getElementById('resultat').textContent = `Le forfait médecin traitant est de : ${forfaitFinal.toFixed(2)} euros.`;
}
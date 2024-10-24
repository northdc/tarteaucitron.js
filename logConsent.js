(function () {

    fetch('https://northdcconsent.netlify.app/.netlify/functions/getSupabaseConfig')
        .then(response => response.json())
        .then(data => {
            // Kontrollera att supabase är definierat
            if (typeof supabase === 'undefined') {
                console.error('Supabase är inte definierad. Se till att Supabase-skriptet laddas korrekt.');
                return;
            }

            // Konfigurera Supabase
            const supabaseUrl = data.supabaseUrl;
            const supabaseKey = data.supabaseKey;
            const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

            // Funktion för att samla in webbläsarens metadata
            function getBrowserMetadata() {
                const userAgent = navigator.userAgent;
                const platform = navigator.platform;
                const timestamp = new Date().toISOString();
                const rootUrl = window.location.origin; // Hämta root-URL

                return {
                    userAgent,
                    platform,
                    timestamp,
                    rootUrl
                };
            }

            // Funktion för att logga samtycke
            async function logConsent(consentGiven, serviceName) {
                const metadata = getBrowserMetadata();

                const consentData = {
                    user_agent: metadata.userAgent,
                    platform: metadata.platform,
                    consent_given: consentGiven,
                    timestamp: metadata.timestamp,
                    root_url: metadata.rootUrl,
                    service_name: serviceName
                };

                const { data, error } = await supabaseClient
                    .from('consent') // Kontrollera att tabellnamnet är korrekt
                    .insert([consentData]);

                if (error) {
                    console.error('Error logging consent:', error);
                } else {
                    console.log('Consent logged');
                }
            }

            // Exponera logConsent globalt
            if (typeof window !== 'undefined') {
                window.logConsent = logConsent;
            }
        })
        .catch(error => {
            console.error('Error fetching Supabase config:', error);
        });

})();

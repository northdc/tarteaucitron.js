(function () {
    // Kontrollera att supabase är definierat
    if (typeof supabase === 'undefined') {
        console.error('Supabase är inte definierad. Se till att Supabase-skriptet laddas korrekt.');
        return;
    }

    // Konfigurera Supabase
    const supabaseUrl = 'https://kndimsbsxsosahlgvwiu.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZGltc2JzeHNvc2FobGd2d2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5Mjg3MDgsImV4cCI6MjA0NDUwNDcwOH0.Beh-lL1SN0saH58BB0m14UfMskzK0hlfz4mGWoX8UoA';
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
})();
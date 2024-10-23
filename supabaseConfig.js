// supabaseConfig.js

// Importera Supabase-klienten
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Konfigurera Supabase
const supabaseUrl = 'https://kndimsbsxsosahlgvwiu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZGltc2JzeHNvc2FobGd2d2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5Mjg3MDgsImV4cCI6MjA0NDUwNDcwOH0.Beh-lL1SN0saH58BB0m14UfMskzK0hlfz4mGWoX8UoA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Funktion för att logga samtycke
export async function logConsent(consentData) {
    console.log(consentData);
    const { data, error } = await supabase
        .from('consents')
        .insert([consentData]);

    if (error) {
        console.error('Error logging consent:', error);
    } else {
        console.log('Consent logged:', data);
    }
}
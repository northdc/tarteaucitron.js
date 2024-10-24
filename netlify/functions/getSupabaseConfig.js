exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Tillåt alla domäner att anropa denna function
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({
            supabaseKey: process.env.SUPABASE_KEY,
            supabaseUrl: process.env.SUPABASE_URL,
        }),
    };
};

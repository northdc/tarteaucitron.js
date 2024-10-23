exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            supabaseKey: process.env.SUPABASE_KEY,
            supabaseUrl: process.env.SUPABASE_URL,
        }),
    };
};

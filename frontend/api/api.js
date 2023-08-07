const fetchCities = async function () {
    try {
        const data = await $.ajax({
            url: "https://data.gov.il/api/3/action/datastore_search",
            data: {
                resource_id: "d4901968-dad3-4845-a9b0-a57d027f11ab",
                limit: 10000
            }
        });

        const records = data.result.records;
        const cityNames = records.map((record) => record["שם_ישוב_לועזי"]);
        cityArray = cityNames;

    } catch (error) {
        console.error("Error:", error);
    }
};

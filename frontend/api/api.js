const fetchCities = async function () {
    let model = Model.getInstance();
    try {
        const data = await $.ajax({
            url: "https://data.gov.il/api/3/action/datastore_search",
            data: {
                resource_id: "d4901968-dad3-4845-a9b0-a57d027f11ab",
                limit: 10000
            }
        });
        const records = data.result.records;
        const cityNames = records.map((record) => record["שם_ישוב"]);
        model.setCities(cityNames);
    } catch (error) {
        console.error("Error:", error);
    }
};

const fetchStreets = async function () {
    let model = Model.getInstance();
    try {
        const data = await $.ajax({
            url: "https://data.gov.il/api/3/action/datastore_search",
            data: {
                resource_id: "9ad3862c-8391-4b2f-84a4-2d4c68625f4b",
                limit: 100000
            }
        });
        const records = data.result.records;
        const addressNames = records.map((record) => [record["שם_רחוב"], record["שם_ישוב"]]);
        const streetNames = [];
        for (let i = 0; i < addressNames.length; i++) {
            //if ($("#city").val() === addressNames[i][1])
            streetNames.push(addressNames[i][0]);
        }

        model.setStreets(streetNames);
    } catch (error) {
        console.error("Error:", error);
    }
};

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      // Block GET requests
      return { statusCode: 400, body: null };
    }

    const Hubspot = require("hubspot");
    const hubspot = new Hubspot({
      accessToken: "pat-na1-6998c637-076e-43d5-a902-3f9649561d13",
    });

    const properties = [
      {
        property: "firstname",
        value: "HubSpot Updated",
      },
      {
        property: "lastname",
        value: "Test",
      },
      {
        property: "website",
        value: "http://hubspot.com",
      },
      {
        property: "company",
        value: "HubSpot",
      },
      {
        property: "phone",
        value: "555-122-2323",
      },
      {
        property: "address",
        value: "25 First Street",
      },
      {
        property: "city",
        value: "Cambridge",
      },
      {
        property: "state",
        value: "MA",
      },
      {
        property: "zip",
        value: "02139",
      },
    ];

    const contact = await hubspot.contacts.createOrUpdate(
      "paulo.guerra.figueiredo@gmail.com",
      {
        properties,
      }
    );

    // Return a 200 if it succeeds
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.log("error", err);
    return { statusCode: 500, body: err.toString() };
  }
};

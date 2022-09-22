exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      // Block GET requests
      return { statusCode: 400, body: null };
    }

    const Hubspot = require("hubspot");
    const hubspot = new Hubspot({
      accessToke: "pat-na1-6998c637-076e-43d5-a902-3f9649561d13",
    });

    const body = JSON.parse(event.body);

    const properties = [
      { property: "firstname", value: body.firstName },
      { property: "lastname", value: body.lastName },
      { property: "phone", value: body.phone },
    ];

    const contact = await hubspot.contacts.createOrUpdate(body.form.email, {
      properties,
    });

    const deal = await hubspot.deals.create({
      // Use the contact ID from the previous call
      associations: { associatedVids: [contact.vid] },
      properties: [
        {
          value: `Website Order for ${body.firstName} ${body.lastName}`,
          name: "dealname",
        },
        {
          // You'll want to grab from your deal stage config in Hubspot (click the code symbol to find this number)
          value: 2413030,
          name: "dealstage",
        },
        {
          value: "default",
          name: "pipeline",
        },
        {
          // This is a float, for example 10.50
          value: body.estimate,
          name: "amount",
        },
        {
          // Add any other fields you want
          value: body.whatever,
          name: "whatever",
        },
      ],
    });

    // Return a 200 if it succeeds
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};

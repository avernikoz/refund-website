import { Context } from "@netlify/edge-functions";

export const RESTRICTED_COUNTRY_CODES_LIST = ["CU", "KP", "IR", "SY", "CO"];

export const RESTRICTED_REGIONS_LIST = ["Crimea", "Donetsk", "Luhansk"];

export default async (request: Request, context: Context) => {
  const countryCode = context.geo?.country?.code ?? ""
  const ciryName = context.geo.city ?? ""

  const isRestrictedCountry = RESTRICTED_COUNTRY_CODES_LIST.includes(countryCode)
  const isRestrictedRegion = RESTRICTED_REGIONS_LIST.includes(ciryName)

  if (isRestrictedCountry || isRestrictedRegion) {
    return new Response(
      `Sorry, Aldrin Refund Website is not available in your country.\n If you think your access is restricted by mistake or have another question, please reach out to us.`,
      {
        headers: { "content-type": "text/html" },
        status: 451,
      }
    );
  }

  const response = await context.next();
  const text = await response.text();

  return new Response(text, response);
};

import {
  REGION_PROVIDER_URL,
  RESTRICTED_COUNTRY_CODES_LIST,
} from "./config";
import { UserMetadata } from "./types";

export const isUserMetadata = (data: unknown): data is UserMetadata => {
  return (
    typeof data === "object" &&
    data !== null &&
    "fl" in data &&
    "h" in data &&
    "ip" in data &&
    "ts" in data &&
    "visit_scheme" in data &&
    "uag" in data &&
    "colo" in data &&
    "sliver" in data &&
    "http" in data &&
    "loc" in data &&
    "tls" in data &&
    "sni" in data &&
    "warp" in data &&
    "gateway" in data &&
    "rbi" in data &&
    "kex" in data &&
    typeof data.fl === "string" &&
    typeof data.h === "string" &&
    typeof data.ip === "string" &&
    typeof data.ts === "string" &&
    typeof data.visit_scheme === "string" &&
    typeof data.uag === "string" &&
    typeof data.colo === "string" &&
    typeof data.sliver === "string" &&
    typeof data.http === "string" &&
    typeof data.loc === "string" &&
    typeof data.tls === "string" &&
    typeof data.sni === "string" &&
    typeof data.warp === "string" &&
    typeof data.gateway === "string" &&
    typeof data.rbi === "string" &&
    typeof data.kex === "string"
  );
};

export const getUserMetadata = async (): Promise<UserMetadata | null> => {
  try {
    const result = await fetch(REGION_PROVIDER_URL)
      .then((res) => res.text())
      .then((data) => {
        const result = data
          .trim()
          .split("\n")
          .reduce((obj: any, pair: string) => {
            const [key, value] = pair.split("=");
            obj[key] = value;
            return obj;
          }, {});

        return result;
      });

    if (isUserMetadata(result)) {
      return result;
    } else {
      console.error("[getUserMetadata] Invalid data received:", result);
      return null;
    }
  } catch (e) {
    console.error("[getUserMetadata] error:", e);
    return null;
  }
};

export const isRegionIsRestricted = ({
  countryCode,
}: {
  countryCode: string;
}) => {
  if (RESTRICTED_COUNTRY_CODES_LIST.includes(countryCode)) {
    return true;
  }

  return false;
};

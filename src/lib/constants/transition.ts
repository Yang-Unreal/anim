import { Url } from "@/lib/type";
import { format } from "url";
export const getUrlAsString = (url: Url): string =>
  typeof url === "string" ? url : format(url);

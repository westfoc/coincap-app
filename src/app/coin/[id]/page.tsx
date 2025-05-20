import { env } from "../../../env";

import type { IndividualAsset } from "../../../types";

import RealTimeAssetUpdater from "../../_components/asset-updator";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  async function fetchAsset(): Promise<IndividualAsset> {
    const resp = await fetch(`https://rest.coincap.io/v3/assets/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "accept: application/json",
        Authorization: `Bearer ${env.NEXT_PUBLIC_APIKEY}`,
      },
    });
    const parsedResp = (await resp.json()) as Promise<IndividualAsset>;
    return parsedResp;
  }

  const asset = await fetchAsset();
  const data = asset.data;

  return <RealTimeAssetUpdater initialData={data} assetId={id} />;
}

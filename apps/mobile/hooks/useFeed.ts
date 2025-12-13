import { useInfiniteQuery } from '@tanstack/react-query';
import { IFeedResponse } from "@memex/shared";
import { getApiBaseUrl } from "../constants/api";

const TAKE = 10;

const fetchFeed = async ({ pageParam = 0 }): Promise<IFeedResponse> => {
	const baseUrl = getApiBaseUrl();
	const url = `${baseUrl}/feed?take=${TAKE}&skip=${pageParam}`;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	});

	if (!response.ok) {
		const body = await response.text().catch(() => "");
		throw new Error(
			`Feed request failed (${response.status}): ${body || response.statusText}`
		);
	}

	return (await response.json()) as IFeedResponse;
};

export const useFeed = () => {
  return useInfiniteQuery({
			queryKey: ["feed"],
			queryFn: fetchFeed,
			initialPageParam: 0,
			getNextPageParam: (lastPage) =>
				lastPage.total != null && lastPage.skip >= lastPage.total
					? undefined
					: lastPage.skip,
		});
};

import { Controller, Get, Logger, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Card } from "../cards/card.entity";
import { WikiIngestService } from "../wiki/wiki.service";
import { IFeedResponse } from "@memex/shared";

@Controller("feed")
export class FeedController {
	private readonly logger = new Logger(FeedController.name);

	constructor(
		@InjectRepository(Card)
		private readonly cardRepository: Repository<Card>,
		private readonly wikiService: WikiIngestService
	) {}

	@Get()
	async getFeed(
		@Query("take") takeRaw?: string,
		@Query("skip") skipRaw?: string
	): Promise<IFeedResponse> {
		this.logger.log("GET /feed requested");

		const take = Math.min(Math.max(Number(takeRaw ?? 20) || 20, 1), 50);
		const skip = Math.max(Number(skipRaw ?? 0) || 0, 0);

		// --- Smart Feed Logic ---
		const count = await this.cardRepository.count();

		if (count < 10) {
			this.logger.log(`Low card count (${count}). Triggering ingestion...`);
			await this.wikiService.fetchAndStore(10);
		}

		const [data, total] = await this.cardRepository.findAndCount({
			take,
			skip,
			order: { createdAt: "DESC" },
		});

		return {
			data,
			take,
			skip: skip + data.length,
			total,
		};
	}
}

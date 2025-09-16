# How does rate limits rate work?
To prevent misuse and manage the capacity of our API, we have implemented limits on how much a workspace can utilize the Mistral API.

We offer two types of rate limits:

- Requests per second (RPS)
- Tokens per minute/month

Key points to note:

- Rate limits are set at the workspace level.
- Limits are defined by usage tier, where each tier is associated with a different set of rate limits.
- In case you need to raise your usage limits, please feel free to contact us by utilizing the support button, providing details about your specific use case.

#Usage tiers
You can view the rate and usage limits for your workspace under the limits section on la Plateforme.

We offer various tiers on the platform, including a free API tier with restrictive rate limits. The free API tier is designed to allow you to try and explore our API. For actual projects and production use, we recommend upgrading to a higher tier.


# My Free Tier WorkSpace Limit
Nombre maximum de requêtes par seconde : 1

## Limites de débit de complétion par modèle
- magistral-medium-latest : ????

# Limites de tokens par modèle Mistral

| Modèle | Tokens par minute | Tokens par mois |
|--------|-------------------|-----------------|
| codestral-2405 | 500 000 | 1 000 000 000 |
| codestral-2501 | 500 000 | 1 000 000 000 |
| codestral-mamba-2407 | 500 000 | 1 000 000 000 |
| ministral-3b-2410 | 500 000 | 1 000 000 000 |
| ministral-8b-2410 | 500 000 | 1 000 000 000 |
| mistral-embed | 20 000 000 | 200 000 000 000 |
| mistral-large-2402 | 500 000 | 1 000 000 000 |
| mistral-large-2407 | 500 000 | 1 000 000 000 |
| mistral-large-2411 | 500 000 | 1 000 000 000 |
| mistral-medium | 500 000 | 1 000 000 000 |
| mistral-moderation-2411 | 500 000 | 1 000 000 000 |
| mistral-saba-2502 | 500 000 | 1 000 000 000 |
| mistral-small-2402 | 500 000 | 1 000 000 000 |
| mistral-small-2409 | 500 000 | 1 000 000 000 |
| mistral-small-2501 | 500 000 | 1 000 000 000 |
| mistral-small-2503 | 500 000 | 1 000 000 000 |
| open-mistral-7b | 500 000 | 1 000 000 000 |
| open-mistral-nemo | 500 000 | 1 000 000 000 |
| open-mixtral-8x22b | 500 000 | 1 000 000 000 |
| open-mixtral-8x7b | 500 000 | 1 000 000 000 |
| pixtral-12b-2409 | 500 000 | 1 000 000 000 |
| pixtral-large-2411 | 500 000 | 1 000 000 000 |


# Modèles ouverts Mistral

| Modèle | Weight availability | Available via API | Description | Max Tokens | API Endpoints | Version |
|--------|-------------------|-------------------|-------------|------------|---------------|---------|
| Magistral Small 1.1 | ✔️ Apache2 | ✔️ | Our small reasoning model released July 2025. | 40k | `magistral-small-2507` | 25.07 |
| Voxtral Small | ✔️ Apache2 | ✔️ | Our first model with audio input capabilities for instruct use cases. | 32k | `voxtral-small-2507` | 25.07 |
| Voxtral Mini | ✔️ Apache2 | ✔️ | A mini version of our first audio input model. | 32k | `voxtral-mini-2507` | 25.07 |
| Mistral Small 3.2 | ✔️ Apache2 | ✔️ | An update to our previous small model, released June 2025. | 128k | `mistral-small-2506` | 25.06 |
| Magistral Small 1 | ✔️ Apache2 | ✔️ | Our first small reasoning model released June 2025. | 40k | `magistral-small-2506` | 25.06 |
| Devstral Small 1.1 | ✔️ Apache2 | ✔️ | An update to our open source model that excels at using tools to explore codebases, editing multiple files and power software engineering agents. | 128k | `devstral-small-2507` | 25.07 |
| Mistral Small 3.1 | ✔️ Apache2 | ✔️ | A new leader in the small models category with image understanding capabilities, released March 2025. | 128k | `mistral-small-2503` | 25.03 |
| Mistral Small 3 | ✔️ Apache2 | ✔️ | A new leader in the small models category, released January 2025. | 32k | `mistral-small-2501` | 25.01 |
| Devstral Small 1 | ✔️ Apache2 | ✔️ | A 24B text model, open source model that excels at using tools to explore codebases, editing multiple files and power software engineering agents. | 128k | `devstral-small-2505` | 25.05 |
| Pixtral 12B | ✔️ Apache2 | ✔️ | A 12B model with image understanding capabilities in addition to text. | 128k | `pixtral-12b-2409` | 24.09 |
| Mistral Nemo 12B | ✔️ Apache2 | ✔️ | Our best multilingual open source model released July 2024. | 128k | `open-mistral-nemo` | 24.07 |
# THADAM AI

Track Your Carbon. Transform Your Future.

## Project structure

```text
.
├── prisma/
│   ├── dev.db
│   └── schema.prisma
├── public/
│   ├── assets/logos/
│   ├── apple-touch-icon.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── manifest.json
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/                    # Next.js pages and API routes
│   │   ├── about/
│   │   ├── admin/
│   │   ├── analytics/
│   │   ├── api/
│   │   │   ├── admin/           # analytics, machines, and users
│   │   │   ├── auth/            # login, logout, and session
│   │   │   ├── carbon/          # assessment, history, and score
│   │   │   ├── chat/
│   │   │   ├── gemini/          # chat, carbon twin, and recommendations
│   │   │   ├── machines/        # nearby, reward, status, and listing
│   │   │   ├── rewards/         # history, redeem, and listing
│   │   │   └── scan/            # analyze
│   │   ├── blogs/
│   │   │   ├── [slug]/
│   │   │   ├── category/[category]/
│   │   │   ├── featured/
│   │   │   ├── research/
│   │   │   ├── technology/
│   │   │   └── trending/
│   │   ├── carbon/
│   │   ├── carbon-twin/
│   │   ├── challenges/
│   │   ├── chat/
│   │   ├── community/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   │   └── settings/
│   │   ├── github/
│   │   ├── login/
│   │   ├── machines/
│   │   ├── privacy/
│   │   ├── profile/
│   │   ├── research/
│   │   ├── rewards/
│   │   ├── scan/
│   │   │   └── history/
│   │   ├── settings/
│   │   ├── support/
│   │   ├── technology/
│   │   ├── terms/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   ├── backgrounds/
│   │   ├── errors/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── constants/
│   ├── data/
│   │   └── mock/
│   ├── lib/
│   ├── providers/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── middleware.ts
├── tests/
│   ├── setup.ts
│   └── *.test.*
├── .eslintrc.json
├── .gitignore
├── lint_output.txt
├── next.config.ts
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── vitest.config.ts
```

# Phase 1 Data Audit Report — aijiesuo.biz (AI解锁)

- **Audit Date:** 2026-11-23
- **Sources Inspected:**
  - `raw-data/32家机场品牌清单.txt`
  - `raw-data/光速云品牌信息.txt`
  - `raw-data/第三方代理客户端.txt`
  - `raw-data/speedtest-manifest.json`
  - `raw-data/README_16个机场测速实测资料_最新版.txt`
  - `docs/public/images/logos/` (30 files)
  - `docs/public/images/speedtests/2026-08-11/` (19 files)
  - `docs/public/images/guangsu/` (5 files)

---

## 1. Corpus Totals & Structural Summary

- **Total Unique Brands (`data/brands.json`):** `32`
  - 28 brands from main sections (`#1`–`#28`, normalized after fixing duplicate `#7` and skipped `#22`)
  - 3 historical archive brands from bottom section (`灵动云`, `浪网`, `边缘节点 EdgeNova`, dated `2026-08-09`)
  - 1 speedtest-only brand (`快狸 kuaili`), included from `speedtest-manifest.json`, `README_16个机场测速实测资料_最新版.txt`, `kuaili_logo.png`, and `快狸-节点测速实测.png`
- **Primary Commercial Brand (`PRIMARY_BRAND_SLUG`):** `guangsu` (`光速云`, `commercialRank: 1`)
- **Total Client Entries (`data/clients.json`):** `50` platform-app entries across `6` platforms (`windows`: 8, `android`: 8, `ios`: 11, `macos`: 9, `linux`: 9, `openwrt`: 5)

---

## 2. Deduplication & Numbering Normalization Log

1. **`Firefly` / `Firefly 萤火虫` Merged -> `slug: "firefly"`:**
   - Appeared twice in `32家机场品牌清单.txt`: as `## 8. Firefly（firefly）` (line 337) and at the bottom as `Firefly 萤火虫` (line 1142, `2026-08-09` historical record).
   - Merged into one canonical brand entity with primary affiliate URL `https://vip02.fireflyaff.com/#/?code=2n7VURre` and `alternateUrls: ["https://vip02.fireflyaff.com/#/?code=jTp9wSgZ"]`.
2. **Heading Numbering Anomalies in `32家机场品牌清单.txt`:**
   - Three consecutive sections shared heading `## 7.`: `二猫云`, `无忧链接`, `唯兔云`.
   - Heading `## 22.` was omitted in the body (`#21 闪电鼠` jumped to `#23 云界线`), whereas the summary table assigned `#22` to `大佬云` (which was `#5` in the body).
   - Ranking order differs across the file: top-line order (`光速云、暮光加速、飞猫云、微风网络、大佬云、星岛梦、隐形人、二猫云、无忧链接、唯兔云、Firefly`), body order (`1..28`), and summary table (`1..28`). Canonical `commercialRank` `1..32` follows normalized body order + historical bottom brands + `kuaili`, while keeping `researchScore` (0–100) completely separate.

---

## 3. Affiliate URL, Coupon & Pricing Conflicts

| Brand (`slug`) | Conflict Category | Observed Discrepancies |
|---|---|---|
| `guangsu` | Traffic / Tiers / Protocol | 轻量版 `59GB/月` (`光速云品牌信息.txt` L8) vs `69GB/月` (L26 & `32家机场品牌清单.txt`); `约8元/月` (annualized) vs `¥25/月` monthly min; `4档`/`3档` vs 7-row plan table; vendor `VLESS` vs measured `Shadowsocks` + `AnyTLS`. |
| `muguang` | Coupon / Price / USP | Coupon `muguang5555` (L52/L930) vs "目前没有查到公开的优惠码信息" (L84); `20元/月 120GB` vs `¥109/年` (`9元/月起`); summary table says "无明确独有卖点". |
| `weifeng` | Price / Traffic / Date | `约7元/月 50GB` vs 清风年付 `¥137/年` (`100GB/月`, `11元/月起`) vs 乘风 `¥27/月 200GB`; screenshot in `2026-08-11/` is actually dated `2026-07-19 18:38:20 CST`. |
| `xingdaomeng` | Protocol | Body text specifies `Trojan`; 2026-08-11 speedtest screenshot shows `Shadowsocks`. |
| `ermao` | Nodes / Protocol / Cycles | Benchmark table lists `新加坡 46ms / 407Mbps` while body claims "少了新加坡这一站"; text says `VLESS` while speedtest shows `Shadowsocks`; text claims "月付到三年付" but table only shows monthly/annual/one-time. |
| `wuyou` | Client Mode / Price / Date | Text claims "2026年10月起专属客户端免订阅" vs summary table "订阅无需转换"; `19元/月` vs MINI `¥79/年` (`6.5元/月`); screenshots in `2026-08-11/` are dated `2026-07-18`. |
| `weitu` | Price / Protocol / USP | `14.9元/月 100GB` is holiday limited plan; regular monthly starts at `¥19.90/月` (`150GB`), plus `¥79.90/年` limited annual; text says `Trojan` vs speedtest `Shadowsocks`; summary table adds "60+节点 + 三网优化 + 智能负载均衡" absent in body. |
| `firefly` | Duplicate / URLs / Mode | Two affiliate codes (`2n7VURre` vs `jTp9wSgZ`); `#8` states proprietary-only client while bottom archive omits restriction; `#8` excludes annual plan from 8折 while archive notes multi-cycle discounts. |
| `yuzhou` | Evidence / USP | Body says "暂无可核实实测数据" & "使用方式待核实", yet `宇宙云-节点测速实测.png` (`VLESS`, `2026-08-11 21:04:24 CST`) exists; summary table adds "IEPL+VLESS+自研客户端". |
| `u1s1` | Missing Plan / Protocol | Text mentions "1000GB 一次性大流量包" absent from price table; protocol omitted in text, `Shadowsocks` in speedtest. |
| `lingmao` | Coupon / Price / Plans | Coupon `lmao888` vs `lingmao` (8折, 年付小包不适用); `19元/月 150GB` vs 月付Small `¥25/月 150GB` (and `¥85/年` `7.1元/月`); summary table mentions "不限时套餐" absent from table; speedtest shows `Shadowsocks`. |
| `jilian` | Protocol / Completeness | Protocol omitted in text; speedtest shows `Shadowsocks`; lacks full multi-tier plan table. |
| `guangnian` | Protocol / Completeness | Text states `VLESS`; speedtest shows `Shadowsocks`; lacks full multi-tier plan table. |
| `yifan` | Coupon / Protocol | Coupon `yfy6666` (L529/L936) vs `1FLYYUN` (9折, L560); lists Hy2/VLESS-Reality/SS, speedtest shows `Shadowsocks`. |
| `sogo` | Coupon / Protocol / Client | Coupon `SOGO10000` (9折, L571/L604) vs `sss777` (L937); states `VLESS` + proprietary-only client, yet 2026-08-11 MAI-TEST-BOT tested `Shadowsocks`. |
| `kexin` | Protocol / Date Confidence | States `VLESS`, speedtest shows `Shadowsocks`; `可信云-节点测速实测.png` lacks full calendar date in image footer (`date-inferred-from-batch-time-visible-in-image`). |
| `sujie` | Protocol / Completeness | States `VLESS`, speedtest shows `Shadowsocks`; lacks full multi-tier plan table. |
| `quanqiu` | Coupon / Price / Line / Mode | Coupon `qq88` (8折, L699) vs `qqy7777` (L941); `¥20/月起` vs 轻量版 `¥99/年`; `IPLC/IEPL` vs `BGP智能优化`; claims proprietary-only + `Trojan/SS` while MAI-TEST-BOT tested `Shadowsocks`. |
| `yunjiexian` | Affiliate Code & Format | Code `aycnwNUi` (L759) vs `HBaZ91c6` (L944); URL missing `#` (`https://qwerty.yunjiexianaff.com/?code=...`). |
| `liulianyun` | URL Format / Protocol | URL missing `/` before `#` (`https://qwerty.liulianyunaff.com#/?code=hS5pvbfE`); protocol unspecified. |
| `huanqiuti` | URL Format | URL missing `#` (`https://qwerty.huanqiutiaff.com/?code=9I4KRNPH`). |
| `yinxingren` | Coupon / Traffic / USP | Coupon `yxr888` (L850/L948) vs `moon80` (8折, L855/L887); `24元/月 100GB` (L850) vs `白银纪元 24元/月 144GB` (L864/L887); summary table claims "60+节点清单 + 1小时修复承诺" absent in body; benchmark table all `—`. |
| `lingdong` | Protocol / Occlusion / Age | `VLESS` measured vs `VLESS/Trojan` mixed copy; `至尊私人定制` traffic occluded ("截图遮挡"); `2026-08-09` historical archive. |
| `langwang` | Occlusion / Missing Fields | 入门流量 "截150G", device limit occluded; protocol/nodes/payment/client/speedtest missing; `2026-08-09` historical archive. |
| `edgenova` | Missing Fields / Age | Protocol/nodes/devices/client/speedtest missing; `2026-08-09` historical archive. |
| `kuaili` | Missing Vendor Data | Present in 2026-08-11 speedtest & logo assets only; absent from `32家机场品牌清单.txt`. |

---

## 4. Asset Mapping Audit

### 4.1 Logos (`docs/public/images/logos/`)
- **Matched to Brands (17):**
  - `guangsu` -> `/images/logos/光速云主图.png`
  - `feimao` -> `/images/logos/飞猫云主图.png`
  - `xingdaomeng` -> `/images/logos/xdm_logo.webp`
  - `ermao` -> `/images/logos/2mao_logo.webp`
  - `weitu` -> `/images/logos/v2云主图.png`
  - `yuzhou` -> `/images/logos/yuzhou_logo.webp`
  - `u1s1` -> `/images/logos/u1s1主图.png`
  - `jilian` -> `/images/logos/极连云主图.png`
  - `guangnian` -> `/images/logos/光年梯主图.png`
  - `yifan` -> `/images/logos/1fly_logo.webp`
  - `sogo` -> `/images/logos/sogo.webp`
  - `sujie` -> `/images/logos/sujie_logo.webp`
  - `quanqiu` -> `/images/logos/全球云主图.png`
  - `yinxingren` -> `/images/logos/隐形人256x256.png`
  - `tiziyun` -> `/images/logos/梯子云256x256.png`
  - `lingdong` -> `/images/logos/灵动云256x256.png`
  - `edgenova` -> `/images/logos/edgenova_logo.webp`
  - `kuaili` -> `/images/logos/kuaili_logo.png`
  *(Count: 18 matched logos; 14 brands have `logo: null`)*
- **Unmatched / Orphan Logos in `docs/public/images/logos/` (12 files):**
  - `bee_logo.webp`, `echo_logo.webp`, `fclogo.webp` (cat+rocket graphic; 飞猫云 already maps to `飞猫云主图.png`), `flyingbird.webp` (referenced only in Firefly relationship note), `flyv机场256x256.png` (FlyV), `galaxy_transparent_square.webp`, `kuku_logo.webp`, `qyt.webp`, `qyt_logo.webp`, `TNT.webp`, `totoro.webp`, `yinyun_logo.webp`.

### 4.2 Speedtest & Unlock Screenshots
- **`speedtest-manifest.json` (16 PNGs, `2026-08-11` CST):** Mapped to `sogo`, `u1s1`, `ermao`, `feimao`, `guangnian`, `guangsu`, `jilian`, `kexin`, `kuaili`, `lingmao`, `quanqiu`, `sujie`, `weitu`, `xingdaomeng`, `yifan`, `yuzhou`. Per `README_16个机场测速实测资料_最新版.txt`, these **do not** prove AI/streaming unlock or long-term stability.
- **Additional Files in `docs/public/images/speedtests/2026-08-11/` (3 files not in manifest):**
  - `微风-节点测速实测.png` -> mapped to `weifeng` (actual footer date: `2026-07-19 18:38:20 CST`, MiaoKo 9Gbps 32-thread `Vless`, 50/50)
  - `无忧链接.jpg` -> mapped to `wuyou` (actual footer date: `2026-07-18 21:40:48 CST`, MiaoKo 9Gbps 32-thread `Vless`, 50/50)
  - `无忧链接2.jpg` -> mapped to `wuyou` (actual footer date: `2026-07-18 21:47:23 CST`, MiaoKo `ynd` YouTube/Netflix/Disney+ unlock check, 50/50)
- **Guangsu Extra MiaoKo Evidence (`docs/public/images/guangsu/`, 5 JPGs):**
  - `photo_2026-08-19_12-13-01.jpg` (A-长沙电信@2Gbps, 6线程, 62/62 SS,含 Disney+/NF/YT/OpenAI/Gemini)
  - `photo_2026-08-19_12-13-50.jpg` (A-广西移动@2Gbps, 6线程, 62/62 SS,含 Disney+/NF/YT/OpenAI/Gemini)
  - `photo_2026-08-19_12-13-58.jpg` (河北联通@2Gbps, 6线程, 62/62 SS,含 Disney+/NF/YT/OpenAI/Gemini)
  - `photo_2026-08-19_12-18-40.jpg` (珠海联通 9Gbps单线程, 70/70 Vless/AnyTLS, 基础流媒体+OpenAI)
  - `photo_2026-08-19_12-20-10.jpg` (珠海联通 9Gbps单线程, 70/70 Vless 订阅速度, 显示前60行)

---

## 5. Pending Verification Queue (Before Production Approval)

1. **Review-Required Speedtest Records:** All 16 `speedtest-manifest.json` records + 3 unmanifested July screenshots + 5 Guangsu August-19 screenshots carry `reviewStatus: "review-required"`, especially `可信云-节点测速实测.png` calendar date verification.
2. **Broken/Anomalous Affiliate URLs:** Verify live browser behavior for `yunjiexian` (missing `#`, 2 codes), `huanqiuti` (missing `#`), `liulianyun` (missing `/`), plus `2026-08-09` historical URLs (`lingdong`, `langwang`, `edgenova`) and `firefly` dual codes (`2n7VURre` vs `jTp9wSgZ`).
3. **Dual Coupon Verification:** Resolve conflicting codes for `lingmao` (`lmao888` vs `lingmao`), `yifan` (`yfy6666` vs `1FLYYUN`), `sogo` (`SOGO10000` vs `sss777`), `quanqiu` (`qq88` vs `qqy7777`), `yinxingren` (`yxr888` vs `moon80`), and `muguang` (`muguang5555` vs none).
4. **Protocol & Client Mode Audits:** Re-verify brands whose vendor claims (`VLESS`/`Trojan` or "proprietary-only") conflict with measured `Shadowsocks` screenshots (`guangsu`, `xingdaomeng`, `ermao`, `weitu`, `feimao`, `u1s1`, `lingmao`, `jilian`, `guangnian`, `sogo`, `kexin`, `sujie`, `quanqiu`).
5. **Missing Brand & AI/Streaming Tests:** Obtain official plans/links for `kuaili` and full plan tables for minimal-entry brands (`dalaoyun`, `yuzhou`, `jilian`, `guangnian`, `kexin`, `sujie`, `shandianshu`, `yunjiexian`, `liulianyun`, `shenxing`, `huanqiuti`, `tiziyun`), plus independent AI/streaming checks for all brands currently marked `vendor_claimed` or `untested`.

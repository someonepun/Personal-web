---
title: "Micro- and Nanoplastics: From Origin to Omics"
date: 2026-10-07
excerpt: Where tiny plastic particles come from, how they get into the human body, what omics data says about their biological effects — and which precautions are actually backed by evidence.
tags: [Environmental Health, Bioinformatics, Toxicology]
---

Plastic does not disappear; it gets smaller. Over decades, bottles, tyres and clothing
break down into fragments too small to see, and those fragments are now being reported
in human blood, lungs, placentas, arteries and brains. This article walks through where
these particles come from, how they enter the body, what bioinformatics and omics studies
reveal about their effects — and, just as importantly, where the evidence is still weak.

> **In short:** exposure is real and widespread. Associations with disease are emerging
> but mostly observational, and some headline tissue measurements are being questioned on
> methodological grounds. Reducing avoidable exposure is reasonable; panic is not supported.

## What counts as a micro- or nanoplastic?

There is no single agreed definition. "Microplastics" are commonly described as plastic
particles smaller than 5 mm, and "nanoplastics" as particles below 1 µm. Hartmann and
colleagues proposed a more consistent framework that defines plastic debris by its
material properties and then classifies it by size, shape, colour and origin[^hartmann].
For human health the size matters a lot: the smaller the particle, the more easily it can
cross biological barriers.

Particles are usually grouped by origin:

- **Primary** — manufactured small or shed directly at small size: tyre wear, fibres from
  synthetic textiles, microbeads, pellets.
- **Secondary** — formed when larger items fragment through sunlight, heat and abrasion.

## Where they come from

The scale of the source is hard to overstate. By 2015 humanity had produced about 8,300
million tonnes of virgin plastic; of the roughly 6,300 million tonnes that had become
waste, around 9% was recycled, 12% incinerated and 79% accumulated in landfills or the
natural environment[^geyer]. Everything left in the environment is a long-term reservoir
of future microplastics.

Two everyday sources stand out:

- **Textiles and tyres.** An IUCN assessment estimated that 15–31% of the plastic entering
  the oceans each year could be primary microplastics, almost two-thirds of it from washing
  synthetic textiles and the abrasion of tyres while driving[^iucn]. One laboratory study
  measured 640,000 to 1,500,000 microfibres released per kilogram of synthetic garments in
  a single wash[^defalco]. Tyre wear is estimated at about 0.81 kg per person per year
  globally, and may make up 3–7% of fine particulate matter (PM2.5) in air[^kole].
- **Food contact and packaging.** Plastics also carry additives — plasticisers, flame
  retardants, stabilisers — that can migrate into food and the environment during use and
  disposal[^hahladakis]. A particle is therefore not only a polymer but also a carrier of
  chemicals.

## How they get into our body

### Ingestion

Food and drink are the best-studied route. Reviewing published measurements covering about
15% of Americans' calorie intake, Cox et al. estimated 39,000–52,000 particles ingested per
year, rising to 74,000–121,000 when inhalation is included; drinking only bottled water
could add around 90,000 particles a year, versus about 4,000 for tap water[^cox].

Newer techniques find far more, because they can see smaller particles. Using stimulated
Raman scattering (SRS) imaging with a machine-learning classifier, Qian et al. counted
around 240,000 plastic particles per litre of bottled water, about 90% of them
nanoplastics[^qian].

Heat and wear are consistent multipliers:

- Steeping a single plastic teabag at 95 °C released about 11.6 billion microplastics and
  3.1 billion nanoplastics into one cup[^teabags].
- Polypropylene infant feeding bottles released up to 16.2 million particles per litre
  during formula preparation, with sterilisation and hot water increasing the release[^bottles].
- Microwaving some food containers released up to 4.22 million microplastics and 2.11
  billion nanoplastics per square centimetre of plastic in three minutes[^microwave]
  (the exact numbers have been debated in published correspondence, but heating was the
  worst-case scenario across conditions).

That ingested plastic passes through us is well established: all eight stool samples in a
small Austrian case series contained microplastics, a median of 20 particles per 10 g,
mostly polypropylene and PET[^stool].

### Inhalation

Indoor air is a meaningful and underrated route. A breathing thermal manikin placed in
three apartments inhaled 1.7–16.2 microplastic particles per cubic metre of air, 81% of
them polyester — consistent with textiles as the source[^manikin]. Microplastics have since
been found in 11 of 13 human lung tissue samples taken during surgery, including deep in
the lower lung, most often polypropylene and PET[^lung].

### Skin

Intact skin is a much better barrier than the gut or lungs, and dermal uptake of intact
particles is generally considered minor compared with ingestion and inhalation — though
it is far less studied.

## Where they have been found inside us

| Tissue | Key finding | Method |
| --- | --- | --- |
| Blood | Plastic particles in 17 of 22 healthy donors; mean 1.6 µg/mL[^blood] | Py-GC/MS |
| Placenta | 12 fragments (5–10 µm) across 4 of 6 placentas[^placenta] | Raman |
| Lung | 39 particles across 11 of 13 surgical samples[^lung] | µFTIR |
| Testis | Microplastics in all 23 human samples; mean 328 µg/g[^testis] | Py-GC/MS |
| Carotid plaque | Polyethylene in 58% of 257 patients' plaques[^atheroma] | Py-GC/MS, EM |
| Brain | Higher than liver and kidney; higher in 2024 than 2016 samples[^brain] | Py-GC/MS, FTIR, EM |

Animal work suggests how particles could reach sensitive organs: in mice given oral
polystyrene particles, nanometre-sized particles — but not larger ones — were detected in
the brain within two hours, and the "corona" of molecules coating the particle (cholesterol
helped, proteins hindered) shaped passage across the blood–brain barrier[^bbb].

### A necessary caveat about these numbers

Several of the most striking tissue concentrations were measured with pyrolysis–gas
chromatography/mass spectrometry (Py-GC/MS), which identifies polymers from their
breakdown products. A 2025 evaluation in human blood concluded that Py-GC/MS is not
currently suitable for reporting polyethylene and PVC in biological samples, because
interferences from the sample itself persist even after digestion[^rauert]. A 2026
editorial in *Environment & Health* warned of a "widening gap" between analytical
certainty and the strength of health conclusions, noting that spectroscopic methods can
also misidentify the body's own material as plastic[^reassessing].

This does not mean the particles are not there — multiple independent methods (Raman,
FTIR, electron microscopy) find them. It means **absolute quantities, especially for
polyethylene in fatty tissues like the brain, should be read with caution.**

## The bioinformatics view: what omics data tells us

Measuring *whether* plastic is present is only the first step. Understanding *what it does*
is increasingly a data problem, and this is where bioinformatics comes in.

### 1. Identifying particles is a classification problem

Every detection method ends in a pattern-matching step: an infrared or Raman spectrum, or
a pyrolysis fingerprint, is compared against reference libraries. The quality of that step
decides whether a particle is called "polypropylene" or "protein". Open-source tools such as
**Open Specy** were created because commercial spectral libraries were often inaccurate,
expensive and missing the diversity of real environmental plastics[^openspecy]. The bottled
water study above relied on a machine-learning model trained to recognise seven common
polymers from SRS images[^qian]. Better reference data and transparent classifiers are
arguably as important as better instruments.

### 2. Transcriptomics and metabolomics: which pathways respond?

Multi-omics experiments expose cells to particles and measure the response across thousands
of genes and metabolites at once. In human bronchial epithelial cells (BEAS-2B), PVC
microplastics changed the expression of 530 genes and the levels of 3,768 metabolites,
pointing to the MAPK and TGF-β signalling pathways, fluid-shear-stress response, amino-acid
metabolism and several lipid pathways (glycerophospholipid, glycerolipid and sphingolipid
metabolism)[^multiomics]. Particles released from microwaved containers killed a large share
of human kidney (HEK293T) cells — but only at 1,000 µg/mL, a concentration far above
realistic exposure[^microwave].

That last point applies to much of the cell literature: **dose realism** is the main thing to
check before drawing conclusions.

A typical analysis of such an experiment looks like this:

```r
library(DESeq2)

# counts: genes x samples; samples: data frame with exposure and batch columns
dds <- DESeqDataSetFromMatrix(counts, colData = samples, design = ~ batch + exposure)
dds <- DESeq(dds)
res <- results(dds, contrast = c("exposure", "nanoplastic", "control"))

# Rank genes by the test statistic, then test pathways (e.g. with fgsea or clusterProfiler)
ranks <- sort(setNames(res$stat, rownames(res)), decreasing = TRUE)
```

Including *batch* in the design and ranking genes for pathway-level testing (rather than
cherry-picking individual genes) are the details that make these studies comparable.

### 3. The microbiome: 16S and metagenomics

The gut is where most ingested plastic meets biology. In mice given 5 µm polystyrene in
drinking water, mucus secretion fell, intestinal barrier function was impaired, gut
microbial diversity changed (15 genera shifted significantly), and serum markers pointed to
disturbed amino-acid and bile-acid metabolism[^gut].

Outside the body, sequencing shows that plastic surfaces host their own ecosystem — the
**plastisphere**, a microbial community distinct from the surrounding water[^plastisphere].
Metagenomic analysis of river microplastics found antibiotic resistance genes 3.46 times
more enriched on the plastic than in the water, alongside mobile genetic elements that can
move those genes between bacteria[^plastiome]. Microplastics may therefore matter for
antimicrobial resistance, not only for toxicology.

### 4. Clinical association data

The strongest human signal so far comes from cardiology. In patients having carotid plaques
removed, those whose plaques contained micro- and nanoplastics had a 4.53-fold higher risk of
heart attack, stroke or death over about 34 months; polyethylene levels also correlated with
inflammatory markers including IL-6 and TNF-α[^atheroma]. In brain tissue, higher levels were
reported in people who had been diagnosed with dementia[^brain].

Both are **associations**. People with more plastic in their tissues may differ in many other
ways, and the measurement caveats above apply. Establishing causation will need prospective
cohorts with validated exposure measurements — a classic epidemiology and data-integration
challenge.

### Open problems

| Question | What would help |
| --- | --- |
| How much is really in human tissue? | Validated methods, certified reference materials, inter-lab comparisons |
| Which doses are realistic for experiments? | Exposure models linked to tissue measurements |
| Do particles or their additives drive effects? | Omics designs that separate polymer, size and leachates |
| Do associations reflect causation? | Prospective cohorts, Mendelian-randomisation-style designs where possible |

## Precautions you can actually take

There are no trials showing that reducing personal exposure improves health outcomes. But
the studies above clearly show *where* exposure is highest, so a few low-cost habits are
well justified:

1. **Don't heat food or drinks in plastic.** Heat consistently increases release — in
   microwaved containers[^microwave], teabags[^teabags] and baby bottles[^bottles]. Use glass,
   ceramic or stainless steel for heating.
2. **Prepare infant formula carefully.** Polypropylene bottles shed far more particles with
   hot water and sterilisation[^bottles]; mixing formula in a non-plastic container and
   cooling it before it goes into the bottle avoids the worst-case conditions.
3. **Prefer tap water over bottled water.** Estimated intake from bottled water is far higher
   than from tap water[^cox][^qian]. Boiling and then filtering hard tap water removed up to
   about 90% of nano- and microplastics in one study, as limescale trapped the particles[^boiled].
4. **Choose loose-leaf tea or paper teabags** over nylon/PET "silky" teabags[^teabags].
5. **Mind indoor air.** Indoor airborne microplastics are mostly textile fibres[^manikin];
   ventilation, regular cleaning and a HEPA-filter vacuum are reasonable (if untested) ways to
   reduce what is inhaled.
6. **Reduce what you add to the environment.** Washing full loads of synthetic clothing less
   often, and using laundry filters where available, cuts fibre release[^defalco]; driving
   less reduces tyre wear[^kole].

### What not to worry about (yet)

The widely shared claim that we each eat a credit card's worth of plastic (about 5 g) a week
comes from an estimate that a later analysis concluded overestimated ingested mass by several
orders of magnitude[^creditcard]. A probabilistic model put typical adult intake at around
583 ng per day — tiny by mass, though still a lot of particles[^lifetime]. Particle number,
size and chemistry likely matter more than total weight.

## Takeaways

- Micro- and nanoplastics come mostly from the breakdown of the plastic we have already made,
  plus continuous shedding from textiles and tyres.
- We are exposed mainly through food, drink and indoor air, and particles have been reported
  in most human tissues examined.
- Omics data point to inflammation, oxidative-stress-related signalling, lipid metabolism and
  gut-microbiome disruption — but often at high doses.
- The best human evidence is associational, and some tissue measurements are under active
  methodological debate.
- Simple habits — especially not heating food in plastic — reduce the largest avoidable
  exposures.

The next decade of this field will be decided less by new headlines than by better
reference data, validated measurements and careful integration of exposure, omics and
clinical data — which is exactly the kind of work bioinformatics is built for.

[^hartmann]: Hartmann NB, Hüffer T, Thompson RC, et al. (2019). Are we speaking the same language? Recommendations for a definition and categorization framework for plastic debris. *Environmental Science & Technology* 53(3), 1039–1047. [doi:10.1021/acs.est.8b05297](https://doi.org/10.1021/acs.est.8b05297)

[^geyer]: Geyer R, Jambeck JR, Law KL (2017). Production, use, and fate of all plastics ever made. *Science Advances* 3, e1700782. [PMC5517107](https://pmc.ncbi.nlm.nih.gov/articles/PMC5517107/)

[^iucn]: Boucher J, Friot D (2017). *Primary Microplastics in the Oceans: A Global Evaluation of Sources.* Gland, Switzerland: IUCN. [IUCN summary](https://iucn.org/news/secretariat/201702/invisible-plastic-particles-textiles-and-tyres-major-source-ocean-pollution-–-iucn-study)

[^defalco]: De Falco F, et al. (2019). The contribution of washing processes of synthetic clothes to microplastic pollution. *Scientific Reports* 9. [PMC6488573](https://pmc.ncbi.nlm.nih.gov/articles/PMC6488573)

[^kole]: Kole PJ, et al. (2017). Wear and tear of tyres: a stealthy source of microplastics in the environment. *International Journal of Environmental Research and Public Health* 14(10), 1265. [MDPI](https://www.mdpi.com/1660-4601/14/10/1265)

[^hahladakis]: Hahladakis JN, Velis CA, Weber R, et al. (2018). An overview of chemical additives present in plastics: migration, release, fate and environmental impact during their use, disposal and recycling. *Journal of Hazardous Materials* 344, 179–199. [White Rose repository](https://eprints.whiterose.ac.uk/122233)

[^cox]: Cox KD, Covernton GA, Davies HL, Dower JF, Juanes F, Dudas SE (2019). Human consumption of microplastics. *Environmental Science & Technology* 53(12), 7068–7074. [PubMed 31184127](https://pubmed.ncbi.nlm.nih.gov/31184127/)

[^qian]: Qian N, et al. (2024). Rapid single-particle chemical imaging of nanoplastics by SRS microscopy. *Proceedings of the National Academy of Sciences*. [PMC10801917](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10801917/)

[^teabags]: Hernandez LM, et al. (2019). Plastic teabags release billions of microparticles and nanoparticles into tea. *Environmental Science & Technology*. [doi:10.1021/acs.est.9b02540](https://doi.org/10.1021/acs.est.9b02540)

[^bottles]: Li D, Shi Y, Yang L, et al. (2020). Microplastic release from the degradation of polypropylene feeding bottles during infant formula preparation. *Nature Food* 1, 746–751. [doi:10.1038/s43016-020-00171-y](https://www.nature.com/articles/s43016-020-00171-y)

[^microwave]: Hussain KA, Romanova S, Okur I, et al. (2023). Assessing the release of microplastics and nanoplastics from plastic containers and reusable food pouches: implications for human health. *Environmental Science & Technology*. [PubMed 37343248](https://pubmed.ncbi.nlm.nih.gov/37343248/) — see also the published [correspondence](https://pubs.acs.org/doi/10.1021/acs.est.4c02467) and [rebuttal](https://pubs.acs.org/doi/10.1021/acs.est.4c04000).

[^stool]: Schwabl P, Köppel S, Königshofer P, et al. (2019). Detection of various microplastics in human stool: a prospective case series. *Annals of Internal Medicine* 171(7), 453–457. [doi:10.7326/M19-0618](https://www.acpjournals.org/doi/10.7326/M19-0618)

[^manikin]: Vianello A, Jensen RL, Liu L, Vollertsen J (2019). Simulating human exposure to indoor airborne microplastics using a Breathing Thermal Manikin. *Scientific Reports* 9. [doi:10.1038/s41598-019-45054-w](https://doi.org/10.1038/s41598-019-45054-w)

[^lung]: Jenner LC, Rotchell JM, Bennett RT, Cowen M, Tentzeris V, Sadofsky LR (2022). Detection of microplastics in human lung tissue using μFTIR spectroscopy. *Science of the Total Environment* 831, 154907. [PubMed 35364151](https://pubmed.ncbi.nlm.nih.gov/35364151/)

[^blood]: Leslie HA, van Velzen MJM, Brandsma SH, Vethaak AD, Garcia-Vallejo JJ, Lamoree MH (2022). Discovery and quantification of plastic particle pollution in human blood. *Environment International* 163, 107199. [VU Amsterdam](https://research.vu.nl/en/publications/discovery-and-quantification-of-plastic-particle-pollution-in-hum/)

[^placenta]: Ragusa A, et al. (2021). Plasticenta: first evidence of microplastics in human placenta. *Environment International* 146, 106274. [doi:10.1016/j.envint.2020.106274](https://doi.org/10.1016/j.envint.2020.106274)

[^testis]: Hu CJ, et al. (2024). Microplastic presence in dog and human testis and its potential association with sperm count and weights of testis and epididymis. *Toxicological Sciences* 200(2), 235–240. [doi:10.1093/toxsci/kfae060](https://doi.org/10.1093/toxsci/kfae060)

[^atheroma]: Marfella R, Prattichizzo F, Sardu C, et al. (2024). Microplastics and nanoplastics in atheromas and cardiovascular events. *New England Journal of Medicine*. [doi:10.1056/NEJMoa2309822](https://www.nejm.org/doi/full/10.1056/NEJMoa2309822)

[^brain]: Nihart AJ, et al. (2025). Bioaccumulation of microplastics in decedent human brains. *Nature Medicine* 31(4), 1114–1119. [doi:10.1038/s41591-024-03453-1](https://www.nature.com/articles/s41591-024-03453-1)

[^bbb]: Kopatz V, Wen K, Kovács T, et al. (2023). Micro- and nanoplastics breach the blood–brain barrier (BBB): biomolecular corona's role revealed. *Nanomaterials* 13, 1404. [doi:10.3390/nano13081404](https://doi.org/10.3390/nano13081404)

[^rauert]: Rauert C, Charlton N, Bagley A, Dunlop SA, Symeonides C, Thomas KV (2025). Assessing the efficacy of pyrolysis–gas chromatography–mass spectrometry for nanoplastic and microplastic analysis in human blood. *Environmental Science & Technology* 59(4), 1984–1994. [doi:10.1021/acs.est.4c12599](https://pubs.acs.org/doi/10.1021/acs.est.4c12599)

[^reassessing]: Yan B, Jiang G (2026). Reassessing toxicity claims of micro- and nanoplastics in human health research. *Environment & Health* 4(4), 560–562. [PubMed 42022195](https://pubmed.ncbi.nlm.nih.gov/42022195/)

[^openspecy]: Cowger W, et al. (2021). Microplastic spectral classification needs an open source community: Open Specy to the rescue! *Analytical Chemistry* 93(21), 7543–7548. [NIST](https://www.nist.gov/node/1693526)

[^multiomics]: Liu C, Chen S, Chu J, Yang Y, Yuan B, Zhang H (2024). Multi-omics analysis reveals the toxicity of polyvinyl chloride microplastics toward BEAS-2B cells. *Toxics* 12(6), 399. [doi:10.3390/toxics12060399](https://www.mdpi.com/2305-6304/12/6/399)

[^gut]: Jin Y, et al. (2019). Impacts of polystyrene microplastic on the gut barrier, microbiota and metabolism of mice. *Science of the Total Environment*. [PubMed 30176444](https://pubmed.ncbi.nlm.nih.gov/30176444/)

[^plastisphere]: Zettler ER, Mincer TJ, Amaral-Zettler LA (2013). Life in the "plastisphere": microbial communities on plastic marine debris. *Environmental Science & Technology* 47(13), 7137–7146. [PubMed 23745679](https://pubmed.ncbi.nlm.nih.gov/23745679/)

[^plastiome]: Guruge KS, Goswami P, Kanda K, et al. (2024). Plastiome: plastisphere-enriched mobile resistome in aquatic environments. *Journal of Hazardous Materials* 471, 134353. [DTU Orbit](https://orbit.dtu.dk/en/publications/plastiome-plastisphere-enriched-mobile-resistome-in-aquatic-envir/)

[^boiled]: Yu Z, et al. (2024). Drinking boiled tap water reduces human intake of nanoplastics and microplastics. *Environmental Science & Technology Letters*. [doi:10.1021/acs.estlett.4c00081](https://doi.org/10.1021/acs.estlett.4c00081)

[^creditcard]: Pletz M (2022). Ingested microplastics: do humans eat one credit card per week? *Journal of Hazardous Materials Letters* 3, 100071. [DOAJ](https://doaj.org/article/c0413ccf4d294cd4942c3d710f5d938a)

[^lifetime]: Mohamed Nor NH, et al. (2021). Lifetime accumulation of microplastic in children and adults. *Environmental Science & Technology*. [PubMed 33724830](https://pubmed.ncbi.nlm.nih.gov/33724830/)

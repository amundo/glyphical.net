let byFrequency = hieroglyphDb.hieroglyphs
  .reduce((byFrequency, hieroglyph) => {
    let frequency = hieroglyph.metadata.frequency;
    if (!byFrequency[frequency]) {
      byFrequency[frequency] = [];
    }
    byFrequency[frequency].push(hieroglyph);
    return byFrequency;
  }, {});

Object.entries(byFrequency)
  .sort(([af, hsa], [bf, hfb]) => parseInt(af) - parseInt(bf))
  .reduce((acc, [frequency, hieroglyphs], i) => {
    let theseFrequencies = hieroglyphs
      .map(h => h.metadata.frequency)
      .reduce((a, b) => a + b);

  acc.cumulative += theseFrequencies

    let percentage = Math.round((acc.cumulative / acc.total) * 100)
    hieroglyphs.forEach(h => (h.metadata.percentage = percentage));
    return acc;
  }, {
    cumulative: 0,
    total: hieroglyphDb.hieroglyphs.reduce((total, h) => total + parseInt(h.metadata.frequency), 0),
  });

hieroglyphDb.hieroglyphs.filter(h => h.metadata.percentage > 10)[0]



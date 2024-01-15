let pairs = `Ⲁ a
alpha
Ⲃ b
beta
Ⲅ g
gamma
Ⲇ d
delta
Ⲉ e
ei
Ⲍ z
zēta
Ⲏ ē
ēta
Ⲑ th
thēta
Ⲓ i
yota
Ⲕ k
kabba
Ⲗ l
lola
Ⲙ m
me
Ⲛ n
ne
Ⲝ ks
eksi
Ⲟ o
o
Ⲡ p
pi
Ⲣ r
ro
Ⲥ s
sima
Ⲧ t
taw
Ⲩ u
epsilon
Ⲫ ph
fi
Ⲭ kh
khe
Ⲯ ps
epsi
Ⲱ ō
ōu
Ϣ sh
shay
Ϥ f
fay
Ϩ h
hōri
Ϫ j
janja
Ϭ tsh
tshēma
Ϯ ti
ti`
.split('\n')
.map((line, i, lines) => lines.slice(i, i+2))
.filter((_,i) => i % 2 === 0)
.map(([copticEnglish, name]) => [...copticEnglish.split(' '), name])
.map(([letter, transliteration, name]) => ({letter, transliteration, name}))
.map(({letter, transliteration, name}) => `<article class=letter>
  <div class=letter>${letter}</div>
  <div class=transliteration>${transliteration}</div>
  <div class=name>${name}</div>
</article>`)
.join('\n')

console.log(pairs)
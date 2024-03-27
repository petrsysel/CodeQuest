import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Rozvoj algoritmického myšlení',
    image: require('@site/static/img/thinking.jpeg').default,
    description: (
      <>
        Moderní svět vyžaduje schopnost efektivně řešit problémy a nalézat inovativní řešení. CodeBlockie se zaměřuje na podporu výuky algoritmizace, jelikož schopnost porozumět problému a systematicky uvažovat je klíčová pro úspěch v digitálním věku.
      </>
    ),
  },
  {
    title: 'Editor vlastních úloh',
    image: require('@site/static/img/editor.png').default,
    description: (
      <>
        Aplikací využitelných v hodinách informatiky je celá řada, avšak většina z nich obsahuje sadu předpřipravených úloh, které vždy nemusí učitelům a lektorům plně vyhovovat. Proto CodeBlockie přináší editor vlastních úloh, který umožňuje přizpůsobit obsah přesně podle potřeb svých žáků. Editor umožňuje vytvářet úkoly, které odpovídají konkrétním učebním cílům a udržují studenty angažované a motivované.
      </>
    ),
  },
  {
    title: 'O autorovi',
    image: require('@site/static/img/autor.jpeg').default,
    description: (
      <>
        Jmenuji se Petr Sysel a jsem studentem Pedagogické fakulty Univerzity Karlovy. Při studiu pracuji jako učitel informatiky na základní škole. V rámci své bakalářské práce jsem se rozhodl spojit svou vášeň pro programování s touhou podporovat vzdělávání v oblasti informatiky a informatického myšlení.
      </>
    ),
  },
];

function Feature({image, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} src={image}/>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

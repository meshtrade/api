import { clsx } from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Multi-Language SDKs',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Official SDKs for Go, Python, and TypeScript generated from the same
        protobuf definitions. Type-safe, consistent APIs across all languages.
      </>
    ),
  },
  {
    title: 'gRPC & REST APIs',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        High-performance gRPC APIs with REST gateway support. Streaming
        capabilities for real-time updates and efficient communication.
      </>
    ),
  },
  {
    title: 'Production Ready',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Built for scale with comprehensive error handling, retry logic,
        connection pooling, and security best practices.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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

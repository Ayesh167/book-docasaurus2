import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.robotAnimationContainer}>
          <div className={styles.robotShape}>
            <div className={styles.robotHead}></div>
            <div className={styles.robotBody}></div>
            <div className={styles.robotArm}></div>
            <div className={styles.robotArm} style={{left: 'auto', right: '30px'}}></div>
            <div className={styles.robotLight}></div>
          </div>
        </div>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="AI Robotics Education Platform - Learn ROS 2, Digital Twins, NVIDIA Isaac, and Vision-Language-Action systems">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container padding-vert--lg">
            <div className="row">
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <div className={clsx(styles.featureIcon, styles.moduleIcon)}>
                    <div className={styles.iconShape}></div>
                  </div>
                  <h3>Four Core Modules</h3>
                  <p>Learn about ROS 2, Digital Twins, NVIDIA Isaac, and Vision-Language-Action systems</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <div className={clsx(styles.featureIcon, styles.buildIcon)}>
                    <div className={styles.iconShape}></div>
                  </div>
                  <h3>Build Physical Robots</h3>
                  <p>Step-by-step guides to create and program your own physical robots</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <div className={clsx(styles.featureIcon, styles.practicalIcon)}>
                    <div className={styles.iconShape}></div>
                  </div>
                  <h3>Practical Applications</h3>
                  <p>Real-world examples and projects to apply your knowledge</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

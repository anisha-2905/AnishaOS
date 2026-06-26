import profilePhoto from '@/assets/images/profile-photo.jpeg';
import '@/styles/about-window.css';

function AboutMeWindow() {
  return (
    <article className="about-log" aria-label="Astronaut log explorer profile">
      <section className="about-log__profile">
        <div className="about-log__avatar" aria-label="Profile photo placeholder">
          <div className="about-log__avatar-frame">
            <img
              className="about-log__avatar-image"
              src={profilePhoto}
              alt="Anisha Salaskar profile"
              draggable="false"
            />
          </div>
          <span className="about-log__avatar-caption">Anisha.png</span>
        </div>

        <div className="about-log__identity">
          <p className="about-log__eyebrow">ASTRONAUT LOG #29</p>
          <dl className="about-log__stats">
            <div>
              <dt>Explorer</dt>
              <dd>Anisha Salaskar</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Active</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Mumbai, India</dd>
            </div>
            <div>
              <dt>System Version</dt>
              <dd>AnishaOS v1.0</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="about-log__divider" aria-hidden="true" />

      <section className="about-log__section" aria-labelledby="about-log-heading">
        <h2 id="about-log-heading" className="about-log__heading">
          ABOUT
        </h2>
        <div className="about-log__copy">
          <p>Hi, I&apos;m Anisha.</p>
          <p>
            I&apos;m a graduate Information Technology student who enjoys building software,
            designing digital experiences, and exploring creative technology.
          </p>
          <p>
            My interests range from web development and software engineering to interactive
            design, real-time graphics, and emerging technologies.
          </p>
        </div>
      </section>

      <div className="about-log__divider" aria-hidden="true" />
    </article>
  );
}

export default AboutMeWindow;

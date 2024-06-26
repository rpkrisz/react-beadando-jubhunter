import {useState, useEffect} from "react";
import TextArea from "../Components/Inputs/TextArea";
import Error from "../Components/Feedbacks/Error";
import {useCreateExperienceMutation} from "../state/experienceApiSlice";
import {useNavigate} from "react-router-dom";
import {setTitle} from "../state/titleSlice.js";
import {useDispatch} from "react-redux";

export default function ExperienceForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("Experience form"));
  }, []);
  
  const navigate = useNavigate();
  const [createExp] = useCreateExperienceMutation();
  const [experienceInput, setExperienceInput] = useState({experience: ""});
  const [error, setError] = useState("");

  const handelChange = e => {
    setExperienceInput({experience: e.target.value});
  };

  function validation(experiences) {
    for (const expRow of experiences) {
      if (expRow.length !== 3) {
        expRow.length < 3
          ? setError(
              `Validation faild! Wrong format - too few arguments, ${
                3 - expRow.length
              } number of ';' is expected at row #${experiences.indexOf(expRow) + 1}!`
            )
          : setError(
              `Validation faild! Wrong format - too many arguments, 'line break' is expected at row #${
                experiences.indexOf(expRow) + 1
              }!`
            );
        return false;
      }
      for (const iter of expRow) {
        if (iter.length === 0) {
          setError(
            `Validation faild! Empty argument of row #${experiences.indexOf(expRow) + 1} at the #${
              expRow.indexOf(iter) + 1
            } argument!`
          );
        }
      }
    }
    return true;
  }

  const handelSubmit = () => {
    setError("");
    const exps = experienceInput.experience
      .split("\n")
      .filter(exp => exp !== "")
      .map(exp => exp.split(";"));

    if (!validation(exps)) {
      return;
    }

    const expobj = exps.map(exp => ({company: exp[0], title: exp[1], interval: exp[2]}));
    createExp({body: expobj}).then(resp => {
      resp.data ? navigate("/") : setError(`${resp.error.data.message}. Try again!`);
    });
  };

  return (
    <>
      {error && <Error closeFunction={() => setError("")} message={error} />}
      <div className="form-control p-3 min-w-full  rounded gap-2">
        <TextArea
          name="experience"
          label="Experiences"
          inputData={experienceInput}
          handelChange={handelChange}
          placeholder="CompanyName;Title;From-To"
        />
        <button className="btn" onClick={handelSubmit}>
          Save experiences
        </button>
      </div>
      <ul className="steps steps-vertical lg:steps-horizontal">
        <li className="step step-primary">Register</li>
        <li className="step step-primary">Add experiences</li>
      </ul>
    </>
  );
}

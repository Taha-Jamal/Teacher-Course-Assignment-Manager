import { Fragment, useEffect, useState } from "react";
import AutoCompleteText from "./AutoCompleteText";
import { SemesterState, getCurriculum, getFaculties } from "../redux/semetser/semesterSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";


export const CourseOffer = function () {
	const { faculty, curriculum, semester } = useSelector((state: RootState) => state.semester);
	const dispatch = useDispatch<AppDispatch>();

	// Remove the unused variable 'changeSemester'
	// const [changeSemester, setchangeSemester]: SemesterState[] = useState();

	// Update the useState hook to correctly assign the initial state value
	const [changeSemester, setchangeSemester] = useState('Fall');

	function handelClick() {
		if(changeSemester === 'Fall'){
			setchangeSemester("Spring");
		}
		else{
			setchangeSemester("Fall");
		}
	}

	useEffect(() => {
		dispatch(getCurriculum());
		dispatch(getFaculties());
	}, []);





	const sems = [
		{ sno: 1, name: "1st" },
		{ sno: 2, name: "2nd" },
		{ sno: 3, name: "3rd" },
		{ sno: 4, name: "4th" },
		{ sno: 5, name: "5th" },
		{ sno: 6, name: "6th" },
		{ sno: 7, name: "7th" },
		{ sno: 8, name: "8th" },
	];
	const secs = [7, 7, 6, 6].map((s) => [...Array(s).keys()].map((i) => String.fromCharCode(i + 1 + 64)));

	return (
		<div>
			<AutoCompleteText items={faculty} />
			<table>
				<tbody>
					<tr>
						<th colSpan={9} style={{ fontWeight: "bold", fontSize: "16pt" }}>
							<button
							onClick={handelClick}
							style={{ textDecoration: "none",border:0, color: "blue" }}>
								{changeSemester}
								
							</button>
						</th>
					</tr>
					<tr>
						<th style={{ width: "50px" }}>SNo.</th>
						<th style={{ width: "450px" }}>Title</th>
						<td colSpan={7} style={{ width: "25px", textAlign: "right" }}>
							<a href="#" style={{ textDecoration: "none", color: "blue" }}>
								Clear All
							</a>
						</td>
					</tr>
					{sems.filter(s => semester === 'Fall' ? s.sno % 2 !== 0 : s.sno % 2 === 0)
  .map((s, scnt) => (
    <Fragment key={s.sno}>
      <tr style={{ fontWeight: "bold" }}>
        <th colSpan={2}>{s.name} Semester</th>
      </tr>
      {curriculum.filter(c => c.semno === s.sno)
        .map((c, i) => (
          <tr key={c.cid} style={{ height: "25px" }}>
            <td style={{ textAlign: "center" }}>{i + 1}</td>
            <td>{c.title}</td>
            {/* Optional: Add here other cells for sections if needed */}
          </tr>
        ))}
    </Fragment>
  ))}

				
					
				</tbody>
			</table>
		</div>
	);
};

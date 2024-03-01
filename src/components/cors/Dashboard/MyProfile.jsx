import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { BiEdit } from "react-icons/bi";





function MyProfile() {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (<div className="text-white bg-richblack-900 flex flex-col gap-5">
        <h1 className="text-3xl not-italic font-medium leading-9 text-richblack-5 ml-[-20px]  font-inter">
            My Profile
        </h1>

        {/* section 1 */}
        <div className="flex p-6 items-center self-stretch gap-20 rounded-lg border border-richblack-800 bg-richblack-800 justify-between">
            <div className="flex items-center gap-[24px]">
                <img src={`${user.image}`}
                    alt={`profile-${user.firstName}`}
                    className='aspect-square w-[78px] rounded-full object-cover'
                />
                <div>
                    <p className="text-richblack-5 text-[18px] font-semibold">{user.firstName + " " + user.lastName}</p>
                    <p className="text-sm not-italic font-normal leading-5 text-richblack-300">{user.email}</p>
                </div>
            </div>
            <IconBtn
                text="Edit"
                onclick={() => { navigate("/dashboard/settings") }}>
                    <BiEdit/>
            </IconBtn>
        </div>

        {/* section 2 */}
        <div className="flex flex-col p-6  self-stretch rounded-lg border border-richblack-800 bg-richblack-800 justify-between">
            <div className="flex justify-between">
                <p className="text-richblack-5 text-[18px] font-semibold">About</p>
                <IconBtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }} >
                        <BiEdit/>
                    </IconBtn>
            </div>
            <p  className="text-sm not-italic font-normal leading-5 text-richblack-300">{user?.additionalDetails?.about ?? "write sometthing about yourself"}</p>
        </div>

        {/* section 3 */}
        <div className="flex flex-col p-6  self-stretch  rounded-lg border border-richblack-800 bg-richblack-800 justify-between">
            <div className="flex justify-between">
                <p className="text-richblack-5 text-[18px] font-semibold">Personal Details</p>
                <IconBtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }} >
                        <BiEdit/>
                    </IconBtn>
            </div>
            <div className="flex justify-evenly">
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-sm not-italic font-normal leading-5 text-richblack-300">First Name</p>
                        <p className="text-richblack-5 text-[18px] font-semibold">{user?.firstName}</p>
                    </div>
                    <div>
                        <p className="text-sm not-italic font-normal leading-5 text-richblack-300">Email</p>
                        <p className="text-richblack-5 text-[18px] font-semibold">{user?.email}</p>
                    </div>
                    <div>
                        <p className="text-sm not-italic font-normal leading-5 text-richblack-300">Gender</p>
                        <p className="text-richblack-5 text-[18px] font-semibold">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-sm not-italic font-normal leading-5 text-richblack-300">Last Name</p>
                        <p className="text-richblack-5 text-[18px] font-semibold">{user?.lastName}</p>
                    </div>
                    <div>
                        <p className="text-sm not-italic font-normal leading-5 text-richblack-300">Phone Number</p>
                        <p className="text-richblack-5 text-[18px] font-semibold">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                    </div>
                    <div>
                        <p className="text-sm not-italic font-normal leading-5 text-richblack-300">Date of Birth</p>
                        <p className="text-richblack-5 text-[18px] font-semibold">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>
        </div>

        

    </div>);
}

export default MyProfile;
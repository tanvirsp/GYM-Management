import MemberList from "../../components/Member/MemberList";
import MemberFiltarBar from "../../components/Member/MemberFiltarBar";



const MemberListPage = () => {
   
    return (
        <div>
            <MemberFiltarBar />
            <MemberList />
        </div>
    );
};

export default MemberListPage;
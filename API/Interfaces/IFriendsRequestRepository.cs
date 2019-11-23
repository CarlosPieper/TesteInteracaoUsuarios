namespace EmagrecerSocial.API.Interfaces
{
    public interface IFriendsRequestRepository
    {
        void Delete(int idLogged, int id);
        void InviteFriend(int idLogged, int id);
        bool VerifyFriendRequest(int idLogged, int id);
    }
}
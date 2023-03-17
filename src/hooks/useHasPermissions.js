import useCurrentUser from "./useCurrentUser";
const useHasPermissions = (requiredfeatures) => {
  const { currentUser } = useCurrentUser();

  if (!currentUser?.features) {
    return false;
  }
  if (typeof requiredfeatures === "string") {
    return currentUser?.features.includes?.(requiredfeatures);
  } else if (Array.isArray(requiredfeatures)) {
    return currentUser?.features.some((permissionName) => Boolean(requiredfeatures.includes?.(permissionName)));
  } else {
    return false;
  }
};

export default useHasPermissions;

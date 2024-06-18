import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Skeleton,
  ListItemText,
  Divider,
} from "@suid/material";

export const UserListItemLoadingSkeleton = ({
  itemAmount,
}: {
  itemAmount: number;
}) => {
  const Components = Array.from(new Array(itemAmount)).map((_, index) => (
    <>
      <ListItem>
        <ListItemButton>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText primary={<Skeleton variant="text" width="80%" />} />
        </ListItemButton>
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  ));

  return <>{Components}</>;
};

import { AppBar as AppBarSuid, Toolbar, Typography } from '@suid/material';
import ThemeToggle from './ThemeToggle';

const NoLoginAppBar = () => {
  return (
    <AppBarSuid>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Demo-Infra
        </Typography>
        <ThemeToggle />
      </Toolbar>
    </AppBarSuid>
  );
};

export default NoLoginAppBar;

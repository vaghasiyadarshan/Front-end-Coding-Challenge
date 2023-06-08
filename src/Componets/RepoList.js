import React from "react";
import Repo from "./Repo";
import { Stack } from "@mui/material";

const RepoList = ({ repos }) => {
  return (
    <Stack>
      {repos.map((repo) => (
        <Repo
          key={repo.id}
          full_name={repo.full_name}
          avatar_url={repo.owner.avatar_url}
          owner={repo.owner.login}
          name={repo.name}
          html_url={repo.html_url}
          description={repo.description}
          stargazers_count={repo.stargazers_count}
          open_issues_count={repo.open_issues_count}
          created_at={repo.created_at}
        />
      ))}
    </Stack>
  );
};

export default RepoList;

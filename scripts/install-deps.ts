import { exec } from "child_process";
import { cwd } from "process";

type Service = {
  name: string;
  serviceDir: string;
  install?: () => void;
};

const installPackages = (cwd: string) => {
  const installProc = exec("npm install", { cwd });
  installProc.stdout?.pipe(process.stdout);
  installProc.stderr?.pipe(process.stderr);
};

const MODULES: Service[] = [
  {
    name: "Manga Flux Client",
    serviceDir: "flux-client",
  },
];

const installDeps = () => {
  MODULES.forEach((module) => {
    console.log(`Installing dependencies for ${module.name}`);
    installPackages(`${cwd()}/${module.serviceDir}`);
    module.install && module.install();
  });
};

installDeps();

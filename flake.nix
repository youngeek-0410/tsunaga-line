{
  description = "";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {nixpkgs, flake-utils, ...}:
    let
      utils = flake-utils;
    in
    utils.lib.eachDefaultSystem(system:
      let 
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        formatter = pkgs.nixpkgs-fmt;

        devShell = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            nodejs-slim_20
            corepack_20
            yarn
            biome
            nodePackages.typescript-language-server
          ];
        };
      }
    );
}

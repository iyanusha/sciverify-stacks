import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;

describe("reputation-token", () => {
  it("ensures simnet is initialized", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("returns token name", () => {
    const { result } = simnet.callReadOnlyFn(
      "reputation-token",
      "get-name",
      [],
      deployer
    );
    expect(result).toBeOk(Cl.stringAscii("SciVerify Reputation"));
  });

  it("returns zero balance for new account", () => {
    const { result } = simnet.callReadOnlyFn(
      "reputation-token",
      "get-balance",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(result).toBeOk(Cl.uint(0));
  });

  it("only authorized can mint tokens", () => {
    const { result } = simnet.callPublicFn(
      "reputation-token",
      "mint",
      [Cl.uint(100), Cl.principal(wallet1)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(100));
  });
});

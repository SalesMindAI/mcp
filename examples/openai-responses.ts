import OpenAI from "openai";

const openai = new OpenAI();

async function main(): Promise<void> {
  const response = await openai.responses.create({
    model: "gpt-5",
    input: "List my 10 most recent SalesMind AI leads and summarise them.",
    tools: [
      {
        type: "mcp",
        server_label: "salesmind",
        server_url: "https://mcp.sales-mind.ai/mcp",
        headers: {
          "X-API-KEY": process.env.SALESMIND_API_KEY!,
        },
        require_approval: "never",
      },
    ],
  });

  console.log(response.output_text);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

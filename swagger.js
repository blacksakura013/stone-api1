module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Stone API",
    version: "1.2.0",
    description:
      "Stone Master & SSKU API (1 Stone : N SSKU, Search with limit/offset, JSON File DB)"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server"
    }
  ],
  tags: [
    { name: "Stone", description: "Stone Master" },
    { name: "SSKU", description: "Stone SKU / Inventory Detail" },
    { name: "Search", description: "Search Stone & SSKU (fuzzy, pagination)" }
  ],

  paths: {
    /* ===================== STONE ===================== */
    "/api/stones": {
      get: {
        tags: ["Stone"],
        summary: "Get all stones",
        responses: {
          200: {
            description: "List of stones",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Stone" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Stone"],
        summary: "Create new stone",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                required: ["name"],
                properties: {
                  name: { type: "string", example: "Diamond" }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Stone created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Stone" }
              }
            }
          }
        }
      }
    },

    /* ===================== SSKU ===================== */
    "/api/sskus": {
      get: {
        tags: ["SSKU"],
        summary: "Get all SSKUs",
        responses: {
          200: {
            description: "List of SSKUs",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/SSKU" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["SSKU"],
        summary: "Create new SSKU",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SSKUInput" }
            }
          }
        },
        responses: {
          201: {
            description: "SSKU created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SSKU" }
              }
            }
          }
        }
      }
    },

    /* ===================== SEARCH ===================== */
    "/api/search/stone": {
      get: {
        tags: ["Search"],
        summary: "Search stone and SSKU (fuzzy)",
        description:
          "Fuzzy search by stone name or SSKU ID. Returns multiple SSKUs per stone with pagination.",
        parameters: [
          {
            name: "search",
            in: "query",
            required: false,
            description: "Stone name or SSKU ID",
            schema: { type: "string", example: "diamond" }
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Max records to return",
            schema: { type: "number", example: 10 }
          },
          {
            name: "offset",
            in: "query",
            required: false,
            description: "Records offset",
            schema: { type: "number", example: 0 }
          }
        ],
        responses: {
          200: {
            description: "Search result with pagination",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SearchResponse"
                }
              }
            }
          }
        }
      }
    }
  },

  components: {
    schemas: {
      /* ===================== STONE ===================== */
      Stone: {
        type: "object",
        properties: {
          id: { type: "number", example: 1 },
          name: { type: "string", example: "Diamond" }
        }
      },

      /* ===================== SSKU ===================== */
      SSKU: {
        type: "object",
        properties: {
          id: { type: "string", example: "SSKU-0001" },
          stone: { type: "string", example: "Diamond" },
          stoneid: { type: "number", example: 1 },

          shape: { type: "string", example: "Round" },
          shapeid: { type: "number", example: 1 },
          cut: { type: "string", example: "Excellent" },
          cutid: { type: "number", example: 1 },
          clarity: { type: "string", example: "VVS1" },
          clarityid: { type: "number", example: 1 },
          color: { type: "string", example: "D" },
          colorid: { type: "number", example: 1 },
          quality: { type: "string", example: "Natural" },
          qualityid: { type: "number", example: 1 },
          size: { type: "string", example: "4.0 mm" },
          sizeid: { type: "number", example: 4 },
          setting: { type: "string", example: "Prong" },
          settingid: { type: "number", example: 1 },

          certificate: { type: "string", example: "GIA" },
          lab: { type: "string", example: "GIA" },
          labid: { type: "number", example: 1 },

          pcs: { type: "number", example: 12 },
          weight: { type: "string", example: "1.200" }
        }
      },

      SSKUInput: {
        type: "object",
        required: ["stone", "stoneid"],
        properties: {
          stone: { type: "string" },
          stoneid: { type: "number" },
          shape: { type: "string" },
          shapeid: { type: "number" },
          cut: { type: "string" },
          cutid: { type: "number" },
          clarity: { type: "string" },
          clarityid: { type: "number" },
          color: { type: "string" },
          colorid: { type: "number" },
          quality: { type: "string" },
          qualityid: { type: "number" },
          size: { type: "string" },
          sizeid: { type: "number" },
          setting: { type: "string" },
          settingid: { type: "number" },
          certificate: { type: "string" },
          lab: { type: "string" },
          labid: { type: "number" },
          pcs: { type: "number" },
          weight: { type: "string" }
        }
      },

      /* ===================== SEARCH RESPONSE ===================== */
      SearchResponse: {
        type: "object",
        properties: {
          total: { type: "number", example: 12 },
          limit: { type: "number", example: 5 },
          offset: { type: "number", example: 0 },
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/StoneSSKUJoin" }
          }
        }
      },

      StoneSSKUJoin: {
        type: "object",
        properties: {
          stone: { type: "string", example: "Diamond" },
          stoneid: { type: "number", example: 1 },
          ssku: { type: "string", example: "SSKU-0001" },

          shape: { type: "string", example: "Round" },
          shapeid: { type: "number", example: 1 },
          cut: { type: "string", example: "Excellent" },
          cutid: { type: "number", example: 1 },
          clarity: { type: "string", example: "VVS1" },
          clarityid: { type: "number", example: 1 },
          color: { type: "string", example: "D" },
          colorid: { type: "number", example: 1 },
          quality: { type: "string", example: "Natural" },
          qualityid: { type: "number", example: 1 },
          size: { type: "string", example: "4.0 mm" },
          sizeid: { type: "number", example: 4 },
          setting: { type: "string", example: "Prong" },
          settingid: { type: "number", example: 1 },
          certificate: { type: "string", example: "GIA" },
          lab: { type: "string", example: "GIA" },
          labid: { type: "number", example: 1 },
          pcs: { type: "number", example: 12 },
          weight: { type: "string", example: "1.200" }
        }
      }
    }
  }
};

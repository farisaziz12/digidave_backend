class QueriesController < ApplicationController
  def index
    queries = Query.all
    render json: queries, except: [:created_at, :updated_at, :request_id]
  end
  

  def create
    query = Query.new
    query.request = params[:request]
    query.response = generate_response
    query.user_id = params[:user_id]
    query.save
    render json: query, except: [:created_at, :updated_at]
  end


  def generate_response
    req = params[:request]
    if req.include?("hello") || req == "hi" || req == "hello"
      response = "Hi, how may I help you?"

    elsif req == "what's up" || req == "what is up" || req == "WhatsApp"

      response = "Not much. What's up with you?"

    elsif req.include?("weather")
      response = "weather-fetch"

    elsif req.include?("Chuck") || req.include?("Norris")
      response = "chuck-norris-fact"

    elsif req.include?("you do") || req.include?("help") || req.include?("capabilities") || req.include?("abilities")

      response = "
        I can be used for music, Chuck Norris facts, the weather, a joke, basic math."

    elsif req.include?("joke")
      response = "joke-fetch"
      
    elsif req.include?("name")
      response = "My name is Dave"


    elsif req.include?("song") || req.include?("music")
      response = "song-fetch"

    elsif req.include?("-") && req.include?("x")
      split_req = req.split
      stringnum1 = split_req.shift
      stringnum2 = split_req.pop
      num1 = stringnum1.to_i
      num2 = split_req[1].to_i
      num3 = stringnum2.to_i
      op1 = split_req[0]
      

      if op1 == "x"
        response = ["mulsub", (num1 * num2 - num3.to_f).to_f]
      else
        response = ["mulsub", (num1 - num2 * num3.to_f).to_f]
      end
      

    elsif req.include?(" + ")
      split_req = req.split
      stringnum1 = split_req.shift
      stringnum2 = split_req.pop
      num1 = stringnum1.to_i
      num2 = stringnum2.to_i

      response = ["sum", num1 + num2]

    elsif req.include?(" - ")
      split_req = req.split
      stringnum1 = split_req.shift
      stringnum2 = split_req.pop
      num1 = stringnum1.to_i
      num2 = stringnum2.to_i

      response = ["sub", num1 - num2]

    elsif req.include?(" x ")
      split_req = req.split
      stringnum1 = split_req.shift
      stringnum2 = split_req.pop
      num1 = stringnum1.to_i
      num2 = stringnum2.to_i

      response = ["mult", num1 * num2]

    elsif req.include?(" / ") || req.include?("÷")
      split_req = req.split
      stringnum1 = split_req.shift
      stringnum2 = split_req.pop
      num1 = stringnum1.to_i
      num2 = stringnum2.to_i

      if num2 == 0 
        response = "LMAO. You thought you could pull a sneaky on me didn't you. Answer is infinity"
      else
        response = ["divi", (num1 / num2.to_f).to_f]
      end

    elsif req.include?("^")
      split_req = req.split
      stringnum1 = split_req.shift
      stringnum2 = split_req.pop
      num1 = stringnum1.to_i
      num2 = stringnum2.to_i

      response = ["pwr", (num1 ** num2.to_f).to_f]
      
    elsif req.include?("element") || req.include?("Element")
      elements = ["hydrogen", "helium", "lithium", "beryllium", "boron", "carbon", "nitrogen", "oxygen", "dluorine", "neon", "sodium", "magnesium", "aluminum", "silicon", "phosphorus", "sulfur", "chlorine", "argon", "potassium", "calcium", "scandium", "titanium", "vanadium", "chromium", "manganese", "iron", "cobalt", "nickel", "copper", "zinc", "gallium", "germanium", "arsenic", "selenium", "bromine", "krypton", "rubidium", "strontium", "yttrium", "zirconium", "niobium", "molybdenum", "technetium", "ruthenium", "rhodium", "palladium", "silver", "cadmium", "indium", "tin", "antimony", "tellurium", "iodine", "xenon", "cesium", "barium", "lanthanum", "cerium", "praseodymium", "neodymium", "promethium", "samarium", "europium", "gadolinium", "terbium", "dysprosium", "holmium", "erbium", "thulium", "ytterbium", "lutetium", "hafnium", "tantalum", "tungsten", "rhenium", "osmium", "iridium", "platinum", "gold", "mercury", "thallium", "lead", "bismuth", "polonium", "astatine", "radon", "francium", "radium", "actinium", "thorium", "protactinium", "uranium", "neptunium", "plutonium", "americium", "curium", "berkelium", "californium", "einsteinium", "fermium", "mendelevium", "nobelium", "lawrencium", "rutherfordium", "dubnium", "seaborgium", "bohrium", "hassium", "meitnerium"] 
      element = elements.find{|element| req.include?(element)}
      response = "element #{element}"
      
    else 
      response = "Sorry, I don't know how to respond to that"
    end
  end

end

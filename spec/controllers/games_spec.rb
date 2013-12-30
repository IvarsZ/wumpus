require 'spec_helper'
require 'json'

describe GamesController do
  
  let(:game_params) { { game: {
    number_of_rows: 8,
    number_of_columns: 12,
    number_of_pits: 6,
    number_of_bats: 4,
    number_of_arrows: 2
  } } }

  describe "creating a game with ajax" do
    
    it "should respond with success" do
      xhr :post, :create, game_params
      expect(response).to be_success
    end

    it "should increment the Game count" do
      
      expect do
        xhr :post, :create, game_params
      end.to change(Game, :count).by(1)
    end

    it "should respond with game id" do
      xhr :post, :create, game_params
      JSON.parse(response.body)["id"].should be 1
    end

    describe "with mising parameters" do
      
      it "should respond with ok being false" do
        xhr :post, :create, game: { game: {} }
        JSON.parse(response.body)["ok"].should be_false
      end
    end
  end
end

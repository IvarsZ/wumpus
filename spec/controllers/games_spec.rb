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
    
    it "responds with success" do
      xhr :post, :create, game_params
      assert_response :ok
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

    context "with mising parameters" do
      
      it "should respond with error" do
        xhr :post, :create, game: { game: {} }
        assert_response :unprocessable_entity
      end
    end
  end

  describe "making a move with ajax" do

    before do
      @game = Game.new(
        number_of_rows: 6,
        number_of_columns: 6,
        number_of_pits: 2,
        number_of_bats: 1,
        number_of_arrows: 1
      )
      @game.stub(:generate_cave) do
        @game.cave = "......" \
                     ".W..P." \
                     "......" \
                     ".TP.D." \
                     "......" \
                     ".B...."
        @game.player_row = 2
        @game.player_column = 2
      end
      @game.save

      xhr :post, :make_move, move_params
    end

    context "with valid move" do
      let(:move_params) { { move: { row: 2, column: 1, game_id: @game.id } } }

      it { assert_response :ok }

      it "responds with notifications" do
         response.body.should eq Game.find(@game.id).get_notifications.to_json
      end
    end

    context "with missing params" do
      let(:move_params) { { move: { move: {} } } }

      it { assert_response :unprocessable_entity }
    end

    context "with unallowed move" do
      let(:move_params) { { move: { row: 4, column: 4 } } }

      it { assert_response :unprocessable_entity }
    end
  end
end

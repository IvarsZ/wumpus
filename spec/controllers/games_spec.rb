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

    it "should increment the GameModel count" do
      
      expect do
        xhr :post, :create, game_params
      end.to change(Game, :count).by(1)
    end

    it "should respond with game id" do
      xhr :post, :create, game_params
      JSON.parse(response.body)["id"].should be 1
    end

    it "should respond with notifications" do
      xhr :post, :create, game_params
      response.body.should include Game.last.get_notifications.to_json.to_s
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
                     "....P." \
                     "......" \
                     ".TP.D." \
                     "......" \
                     ".B...."
        @game.player_row = 2
        @game.player_column = 2
        @game.wumpus_row = 1
        @game.wumpus_column = 1
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
      let(:move_params) { { move: { row: 4, column: 4, game_id: @game.id } } }

      it { assert_response :unprocessable_entity }
    end
  end

  describe "making a shot with ajax" do

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
                     "....P." \
                     "......" \
                     ".TP.D." \
                     "......" \
                     ".B...."
        @game.player_row = 1
        @game.player_column = 2
        @game.wumpus_row = 1
        @game.wumpus_column = 1
      end
      @game.save

      xhr :post, :make_shot, shot_params
    end

    context "with valid shot" do
      let(:shot_params) { { shot: { row: 2, column: 2, game_id: @game.id } } }

      it { assert_response :ok }

      it "responds with wumpus dead notification" do
        response.body.to_json.should include "wumpus_dead"
      end
    end

    context "with missing params" do
      let(:shot_params) { { shot: { shot: {} } } }

      it { assert_response :unprocessable_entity }
    end

    context "with unallowed shot" do
      let(:shot_params) { { shot: { row: 4, column: 4, game_id: @game.id } } }

      it { assert_response :unprocessable_entity }
    end
  end
end

require 'spec_helper'

describe Game do

  RSpec::Matchers.define :notify do |notification|
    
    match do |it|
      it[notification]
    end
  end
  
  before do
    @game = Game.new(
      number_of_rows: 8,
      number_of_columns: 12,
      number_of_pits: 6,
      number_of_bats: 4,
      number_of_arrows: 2
    )
  end

  subject { @game }
  
  it { should respond_to(:number_of_rows) }
  it { should respond_to(:number_of_columns) }
  it { should respond_to(:number_of_pits) }
  it { should respond_to(:number_of_bats) }
  it { should respond_to(:number_of_arrows) }
  it { should respond_to(:cave) }

  it { should be_valid }

  context "when number of rows is not present" do
    before { @game.number_of_rows = " " }
    it { should_not be_valid }
  end

  context "when number of columns is not present" do
    before { @game.number_of_columns = " " }
    it { should_not be_valid }
  end
  
  context "when number of pits is not present" do
    before { @game.number_of_pits = " " }
    it { should_not be_valid }
  end
  
  context "when number of bats is not present" do
    before { @game.number_of_bats = " " }
    it { should_not be_valid }
  end

  context "when number of arrows is not present" do
    before { @game.number_of_arrows = " " }
    it { should_not be_valid }
  end

  describe "cave" do
    
    before { @game.save }

    it "is generated" do
      @game.cave.should_not be_blank
    end

    it "has player with current position" do
      @game.player_row.should be
      @game.player_column.should be
    end

    it "has door" do
      @game.cave.count(Game::CONTENTS[:door]).should be 1
    end

    it "has treasure" do
      @game.cave.count(Game::CONTENTS[:treasure]).should be 1
    end

    it "has wumpus with position" do
      @game.wumpus_row.should_not be_nil
      @game.wumpus_column.should_not be_nil
    end

    it "has correct number of pits" do
      @game.cave.count(Game::CONTENTS[:pit]).should be @game.number_of_pits
    end

    it "has correct number of bats" do
      @game.cave.count(Game::CONTENTS[:bat]).should be @game.number_of_bats
    end

    it "has player's starting row and column" do
      @game.player_start_row.should_not be_nil
      @game.player_start_column.should_not be_nil
    end
    
    it "the player's starting row and column matches the player's current row and column at the beginning" do
      @game.player_row.should eq @game.player_start_row
      @game.player_column.should eq @game.player_start_column
    end

    it "has wumpu's starting row and column" do
      @game.wumpus_start_row.should_not be_nil
      @game.wumpus_start_column.should_not be_nil
    end

    it "the wumpu's starting row and column matches the wumpu's current row and column at the beginning" do
      @game.wumpus_row.should eq @game.wumpus_start_row
      @game.wumpus_column.should eq @game.wumpus_start_column
    end
  end

  describe "move player" do
    let(:player)  { { row: 1, column: 2 } }
    let(:move_to) { { row: 2, column: 2 } }
    let(:wumpus)  { { row: 1, column: 1 } }

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
                     "P....." \
                     ".T..D." \
                     "......" \
                     ".B...."
        @game.player_row = player[:row]
        @game.player_column = player[:column]
        @game.wumpus_row = wumpus[:row]
        @game.wumpus_column = wumpus[:column]
      end
      @game.save
    end
    
    subject { @game.move_player(move_to[:row], move_to[:column]) }

    context "to empty cell with nothing around" do
      let(:player)  { { row: 1, column: 2 } }
      let(:move_to) { { row: 2, column: 2 } }

      it { should_not notify :nearby_wumpus }
      it { should_not notify :pit }
      it { should_not notify :treasure }
      it { should_not notify :treasure_found }
      it { should_not notify :on_wumpus }
      it { should_not notify :on_pit }
    end

    context "to cell with only nearby wumpus" do
      let(:player)  { { row: 2, column: 2 } }
      let(:move_to) { { row: 1, column: 2 } }

      it { should notify :nearby_wumpus }
      it { should_not notify :nearby_pits }
      it { should_not notify :nearby_treasure }
    end

    context "to cell with wumpus nearby but on 'opposite side'" do

      let(:player)  { { row: 0, column: 5 } }
      let(:move_to) { { row: 1, column: 5 } }
      let(:wumpus)  { { row: 1, column: 0 } }
 
      it { should notify :nearby_wumpus }
    end

    context "to cell with only nearby pit" do
      let(:player)  { { row: 0, column: 5 } }
      let(:move_to) { { row: 0, column: 4 } }

      it { should_not notify :nearby_wumpus }
      it { should notify :nearby_pits }
      it { should_not notify :nearby_treasure }
    end

   context "to cell with only nearby treasure" do
      let(:player)  { { row: 4, column: 2 } }
      let(:move_to) { { row: 3, column: 2 } }

      it { should_not notify :nearby_wumpus }
      it { should_not notify :nearby_pits }
      it { should notify :nearby_treasure }

      context "after the treasure has been found" do
        it { should notify :nearby_treasure }
      end
    end

   context "to cell with nearby treasure, pit and wumpus" do
      let(:player)  { { row: 2, column: 2 } }
      let(:move_to) { { row: 2, column: 1 } }

      it { should notify :nearby_wumpus }
      it { should notify :nearby_pits }
      it { should notify :nearby_treasure }
    end

    context "on wumpus" do
      let(:player)  { { row: 2, column: 1 } }
      let(:move_to) { { row: 1, column: 1 } }
      
      it { should notify :on_wumpus }
    end

    context "on pit" do
      let(:player) { { row: 2, column: 1 } }
      let(:move_to) { { row: 2, column: 0 } }
      
      it { should notify :on_pit }
    end

    context "on treasure for the first time" do
      let(:player) { { row: 2, column: 1 } }
      let(:move_to) { { row: 3, column: 1 } }
      
      it { should notify :treasure_found }

      it "treasure found is true" do
        @game.move_player(move_to[:row], move_to[:column])
        @game.treasure_found?.should be_true
      end
    end

    context "on treasure for the second time" do
      let(:player) { { row: 2, column: 1 } }
      let(:move_to) { { row: 3, column: 1 } }

      before do
        @game.move_player(move_to[:row], move_to[:column])
      end
      
      it { should_not notify :treasure_found }

      it "treasure found is true" do
        @game.move_player(move_to[:row], move_to[:column])
        @game.treasure_found?.should be_true
      end
    end

    context "on door" do
      let(:player) { { row: 3, column: 3 } }
      let(:move_to) { { row: 3, column: 4 } }

      it { should notify :on_door }
      it { should_not notify :game_won }

      context "when treasure is found" do

        before do
          @game.treasure_found = true
        end
        
        it { should notify :on_door }
        it { should notify :game_won }
      end
    end

    context "on bat" do
      let(:player) { { row: 5, column: 0 } }
      let(:move_to) { { row: 5, column: 1 } }

      it "teleports player to another cell" do
        # TODO better test
        (@game.player_row != move_to[:row] || @game.player_column != move_to[:column]).should be_true
      end

      it "teleports player to another cell without a bat" do
        @game.send(:get_cell, @game.player_row, @game.player_column).should_not be Game::CONTENTS[:bat]
      end

      it {should notify :by_bat }

      its([:by_bat]) { should include(:row, :column) }
    end
  end
end
